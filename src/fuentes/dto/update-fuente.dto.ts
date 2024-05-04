import { PartialType } from '@nestjs/mapped-types';
import { CreateFuenteDto } from './create-fuente.dto';
import {
  IsUUID,
  IsOptional,
  IsString,
  IsInt,
  IsPositive,
  IsBoolean,
  MinLength,
} from 'class-validator';

export class UpdateFuenteDto extends PartialType(CreateFuenteDto) {
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

  @IsBoolean()
  @IsOptional()
  is_monitoring?: boolean;

  @IsString()
  @MinLength(2)
  @IsOptional()
  materia: string;

  organization: string;

  @IsString()
  @MinLength(2)
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  @MinLength(2)
  url: string;
}
