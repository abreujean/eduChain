import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SorobanModule } from './soroban/soroban.module';
import { PrismaModule } from './prisma/prisma.module';
import { InstitutionsModule } from './institutions/institutions.module';

@Module({
  imports: [InstitutionsModule],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaModule,
    SorobanModule
  ],
})
export class AppModule {}
