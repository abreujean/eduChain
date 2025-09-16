import { Module } from '@nestjs/common';
import { InstitutionsService } from './institutions.service';
import { InstitutionsController } from './institutions.controller';
import { PrismaModule } from 'src/prisma/prisma.module'; // <-- IMPORTE AQUI
import { SorobanModule } from 'src/soroban/soroban.module'; // <-- IMPORTE AQUI

@Module({
  imports: [PrismaModule, SorobanModule], // <-- ADICIONE AQUI
  controllers: [InstitutionsController],
  providers: [InstitutionsService],
})
export class InstitutionsModule {}