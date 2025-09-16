import { Body, Controller, Post } from "@nestjs/common";
import { SorobanService } from "src/soroban/soroban.service";
import { CreateDonationDto } from "./dto/create-donation.dto";
import { User } from "src/auth/user.decorator";

@Controller('donations')
export class DonationsController {
  constructor(private sorobanService: SorobanService) {}
  
  // Supondo que você obtenha o `donorAddress` de um token JWT ou similar
  @Post('assemble')
  async assembleDonation(@Body() createDonationDto: CreateDonationDto, @User('id') donorAddress: string) {
    // Transforma o DTO em um Map<string, bigint>
    const donationMap = new Map<string, bigint>();
    createDonationDto.donations.forEach(d => {
      donationMap.set(d.recipientAddress, BigInt(d.amount));
    });

    const transactionXDR = await this.sorobanService.assembleDonationTransaction(donorAddress, donationMap);
    return { transactionXDR };
  }
}