import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SorobanService } from 'src/soroban/soroban.service';
import { CreateInstitutionDto } from './dto/create-institution.dto';

// src/institutions/institutions.service.ts
@Injectable()
export class InstitutionsService {
  constructor(
    private prisma: PrismaService,
    private sorobanService: SorobanService,
  ) {}

  // Cria uma nova instituição
  async create(createInstitutionDto: CreateInstitutionDto) {
    const { student_count, school_days, unit_value } = createInstitutionDto;

    // 1. Calcule os valores aqui na aplicação
    const total_value = Number(student_count) * Number(school_days) * Number(unit_value);
    const installment_value = total_value / 8; // Ou sua lógica de parcelamento

    // 2. Adicione os valores calculados ao objeto antes de salvar
    const dataToSave = {
      ...createInstitutionDto,
      total_value,
      installment_value,
    };

    // 3. Salve o objeto completo no banco
    return this.prisma.institutions.create({
      data: dataToSave,
    });
  }

  // Lista todas as instituições
  findAll() {
    return this.prisma.institutions.findMany();
  }

  // Encontra uma instituição pelo ID
  findOne(id: string) {
    return this.prisma.institutions.findUnique({
      where: { id },
    });
  }

  async whitelistInstitution(institutionId: string): Promise<string> {
    // 1. Achar a instituição no seu banco
    const institution = await this.prisma.institutions.findUnique({
      where: { id: institutionId },
    });
    if (!institution?.stellar_wallet) {
      throw new NotFoundException('Institution or its wallet not found');
    }

    // 2. Chamar o SorobanService
    const txHash = await this.sorobanService.addToWhitelist([
      institution.stellar_wallet,
    ]);

    // 3. (Opcional) Salvar um status no seu banco
    // await this.prisma.institutions.update(...);

    return txHash;
  }
}
