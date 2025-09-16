import { useState, useEffect } from 'react';
import { Horizon } from 'stellar-sdk';

const STELLAR_HORIZON_URL = 'https://horizon-testnet.stellar.org';

const useStellarBalance = (publicKey: string | null) => {
  const [balance, setBalance] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!publicKey) {
      setBalance(null);
      console.log('useStellarBalance: No public key provided.');
      return;
    }

    const fetchBalance = async () => {
      setLoading(true);
      setError(null);
      console.log(`useStellarBalance: Fetching balance for ${publicKey}`);
      try {
        const server = new Horizon.Server(STELLAR_HORIZON_URL);
        const account = await server.loadAccount(publicKey);
        const xlmBalance = account.balances.find(
          (balance) => balance.asset_type === 'native'
        );
        const finalBalance = xlmBalance ? parseFloat(xlmBalance.balance).toFixed(2) : '0.00';
        setBalance(finalBalance);
        console.log('useStellarBalance: Balance fetched successfully:', finalBalance);
      } catch (err) {
        setError('Failed to fetch balance');
        console.error('useStellarBalance: ERROR fetching balance:', err);
        setBalance(null);
      }
      setLoading(false);
    };

    fetchBalance();
  }, [publicKey]);

  return { balance, loading, error };
};

export default useStellarBalance;