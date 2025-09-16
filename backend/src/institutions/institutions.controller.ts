import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { InstitutionsService } from './institutions.service';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { SorobanService } from 'src/soroban/soroban.service';

@Controller('institutions')
// @UseGuards(AdminGuard) // <-- Proteja suas rotas de admin!
export class InstitutionsController {
  constructor(
    private institutionsService: InstitutionsService,
    // Injetando o SorobanService para testes
    private sorobanService: SorobanService
  ) {}

  @Post()
  create(@Body() createInstitutionDto: CreateInstitutionDto) {
    return this.institutionsService.create(createInstitutionDto);
  }

  @Get()
  findAll() {
    return this.institutionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.institutionsService.findOne(id);
  }

  @Post(':id/whitelist')
  async whitelistInstitution(@Param('id') id: string) {
    const txHash = await this.institutionsService.whitelistInstitution(id);
    return {
      message: 'Institution whitelisted successfully',
      transactionHash: txHash,
    };
  }

  @Post('/init-contract-test')
  async initContract() {
    // O Asset ID do XLM na futurenet.
    const XLM_ASSET_ID =
      'CAS3J72WA5M3M4AEMN6363IHMQVJ3Z3HDZCSMBNYMW5L6K7TE2J14GCP';
    const FEE_BPS = 100; // 1%
    return this.sorobanService.initializeContract(XLM_ASSET_ID, FEE_BPS);
  }
}
