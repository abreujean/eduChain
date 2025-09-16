import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as StellarSdk from 'stellar-sdk';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

@Injectable()
export class SorobanService {
  private readonly logger = new Logger(SorobanService.name);
  // CORREÇÃO: SorobanRpc foi renomeado para RPC na v13+
  private server: StellarSdk.rpc.Server;
  private networkPassphrase: string;
  private contractId: string;
  private foundationSigner: StellarSdk.Keypair;

  constructor(private configService: ConfigService) {
    const rpcUrl = this.configService.get<string>('SOROBAN_RPC_URL');
    const networkPassphrase = this.configService.get<string>(
      'SOROBAN_NETWORK_PASSPHRASE',
    );
    const contractId = this.configService.get<string>('EDUCHAIN_CONTRACT_ID');
    const foundationSecret = this.configService.get<string>(
      'FOUNDATION_SECRET_KEY',
    );

    if (!rpcUrl || !networkPassphrase || !contractId || !foundationSecret) {
      throw new Error(
        'Missing Soroban configuration in .env. Please check all variables.',
      );
    }

    this.networkPassphrase = networkPassphrase;
    this.contractId = contractId;
    this.foundationSigner = StellarSdk.Keypair.fromSecret(foundationSecret);
    // CORREÇÃO: Usando a nova nomenclatura RPC.Server
    this.server = new StellarSdk.rpc.Server(rpcUrl, { allowHttp: false });
  }

  private async invokeContract(
    method: string,
    ...params: StellarSdk.xdr.ScVal[]
  ): Promise<string> {
    const sourceAccount = await this.server.getAccount(
      this.foundationSigner.publicKey(),
    );
    const contract = new StellarSdk.Contract(this.contractId);

    const txBuilder = new StellarSdk.TransactionBuilder(sourceAccount, {
      fee: '1000000',
      networkPassphrase: this.networkPassphrase,
    })
      .addOperation(contract.call(method, ...params))
      .setTimeout(30);

    const tx = txBuilder.build();
    tx.sign(this.foundationSigner);

    try {
      const simulated = await this.server.simulateTransaction(tx);

      if ('error' in simulated) {
        this.logger.error('❌ Transaction simulation failed:', simulated.error);
        throw new Error(`Transaction simulation failed: ${simulated.error}`);
      }

      this.logger.log('✅ Transaction simulation successful.');

      const sendTxResponse = await this.server.sendTransaction(tx);
      this.logger.log(`Transaction sent with hash: ${sendTxResponse.hash}`);

      const POLLING_TIMEOUT_SECONDS = 60;
      const startTime = Date.now();

      while (Date.now() - startTime < POLLING_TIMEOUT_SECONDS * 1000) {
        const getTxResponse = await this.server.getTransaction(
          sendTxResponse.hash,
        );

        switch (getTxResponse.status) {
          case 'SUCCESS':
            // 👇 CORREÇÃO 1: Usando sendTxResponse.hash para o log de sucesso
            this.logger.log(
              `✅ Transaction successful! Hash: ${sendTxResponse.hash}`,
            );
            this.logger.log(`Result XDR: ${getTxResponse.resultXdr}`);
            return sendTxResponse.hash; // Retornamos o hash que já conhecemos

          case 'FAILED':
            this.logger.error(`❌ Transaction failed`, getTxResponse);
            throw new Error(
              `Transaction failed with status FAILED: ${JSON.stringify(getTxResponse)}`,
            );

          // 👇 CORREÇÃO 2: O caso 'PENDING' foi removido
          // O caso 'NOT_FOUND' já lida com a espera da transação
          case 'NOT_FOUND':
            this.logger.log(
              `⏳ Polling tx status: NOT_FOUND, waiting for propagation...`,
            );
            await sleep(3000);
            continue; // Continua para a próxima iteração do loop

          default:
            // Esta linha ajuda a capturar quaisquer status inesperados no futuro
            throw new Error(
              `Unknown transaction status: ${(getTxResponse as any).status}`,
            );
        }
      }

      throw new Error(
        `Transaction polling timed out after ${POLLING_TIMEOUT_SECONDS} seconds.`,
      );
    } catch (error) {
      if (error.response && error.response.data) {
        this.logger.error(
          'Error detail from RPC:',
          error.response.data.error.message,
        );
      } else {
        this.logger.error(
          'Error during transaction submission/polling',
          error.message,
        );
      }
      throw error;
    }
  }

  // --- Funções Públicas ---

  async addToWhitelist(addresses: string[]): Promise<string> {
    const scValAddresses = addresses.map((addr) =>
      new StellarSdk.Address(addr).toScVal(),
    );
    const vec = StellarSdk.xdr.ScVal.scvVec(scValAddresses);
    return this.invokeContract('add_to_whitelist', vec);
  }

  async startStream(
    recipientAddress: string,
    ratePerSecond: bigint,
  ): Promise<string> {
    const scValRecipient = new StellarSdk.Address(recipientAddress).toScVal();
    const scValRate = StellarSdk.nativeToScVal(ratePerSecond, { type: 'u128' });
    return this.invokeContract('start_stream', scValRecipient, scValRate);
  }

  async assembleDonationTransaction(
    donorAddress: string,
    donations: Map<string, bigint>,
  ): Promise<string> {
    const sourceAccount = await this.server.getAccount(donorAddress);
    const contract = new StellarSdk.Contract(this.contractId);

    const scMapEntries = Array.from(donations.entries()).map(
      ([address, amount]) => {
        return new StellarSdk.xdr.ScMapEntry({
          key: new StellarSdk.Address(address).toScVal(),
          val: StellarSdk.nativeToScVal(amount, { type: 'u128' }),
        });
      },
    );
    const scMap = StellarSdk.xdr.ScVal.scvMap(scMapEntries);

    const tx = new StellarSdk.TransactionBuilder(sourceAccount, {
      fee: '1000000',
      networkPassphrase: this.networkPassphrase,
    })
      .addOperation(
        contract.call(
          'donate_to_schools',
          new StellarSdk.Address(donorAddress).toScVal(),
          scMap,
        ),
      )
      .setTimeout(180)
      .build();

    return tx.toXDR();
  }

  async initializeContract(
    tokenAddress: string,
    feeBps: number,
  ): Promise<string> {
    const scValAdmin = new StellarSdk.Address(
      this.foundationSigner.publicKey(),
    ).toScVal();
    const scValToken = new StellarSdk.Address(tokenAddress).toScVal();
    const scValFee = StellarSdk.nativeToScVal(feeBps, { type: 'u32' });
    return this.invokeContract('initialize', scValAdmin, scValToken, scValFee);
  }
}
