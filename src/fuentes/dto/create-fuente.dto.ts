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
  @MinLength(1)
  editores: string;

  @IsInt()
  @IsPositive()
  frequency: number;

  @IsBoolean()
  @IsOptional()
  isOpen?: boolean;

  @IsString()
  @MinLength(1)
  materia: string;

  @IsString()
  @MinLength(1)
  organization: string;

  @IsString()
  @MinLength(1)
  title: string;

  @IsString()
  @MinLength(1)
  url: string;

  @IsString()
  @MinLength(1)
  ejesTematicos: string;
}
