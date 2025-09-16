import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

class DonationSplitDto {
  @IsString()
  @IsNotEmpty()
  recipientAddress: string;

  @IsString() // Enviamos como string para evitar problemas com números grandes
  @IsNotEmpty()
  amount: string;
}

export class CreateDonationDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DonationSplitDto)
  donations: DonationSplitDto[];
}