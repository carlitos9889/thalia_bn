import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CreateFuenteDto {
  @IsUUID()
  @IsOptional()
  id: string;

  @IsString()
  editores: string;

  @IsInt()
  @IsPositive()
  frequency: number;

  @IsBoolean()
  @IsOptional()
  isOpen?: boolean;

  @IsString()
  @MinLength(2)
  materia: string;

  @IsString()
  @MinLength(2)
  organization: string;

  @IsString()
  @MinLength(2)
  title: string;

  @IsString()
  @MinLength(2)
  url: string;
}
