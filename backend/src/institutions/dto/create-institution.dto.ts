import {
  IsString,
  IsNotEmpty,
  IsUUID,
  IsOptional,
  IsInt,
  IsNumber,
  IsBoolean,
  Min,
  Max,
} from 'class-validator';

export class CreateInstitutionDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  postal_code: string;

  @IsString()
  @IsNotEmpty()
  full_address: string;
  
  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  // Assumindo que o front-end enviará o ENUM como string
  @IsString()
  @IsNotEmpty()
  type: 'community_school' | 'quilombola' | 'indigenous';

  @IsInt()
  @Min(0)
  student_count: number;
  
  @IsInt()
  @Min(0)
  school_days: number;

  @IsNumber()
  @Min(0)
  unit_value: number;

  @IsOptional()
  @IsString()
  stellar_wallet?: string;

  @IsOptional()
  @IsUUID()
  manager_id?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  infrastructure_score?: number;

  @IsOptional()
  @IsBoolean()
  has_internet?: boolean;

  @IsOptional()
  @IsBoolean()
  has_computers?: boolean;

  @IsOptional()
  @IsBoolean()
  has_library?: boolean;
}
