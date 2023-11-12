import { PartialType } from '@nestjs/mapped-types';
import { CreateFuenteDto } from './create-fuente.dto';
import {
  IsUUID,
  IsOptional,
  IsString,
  IsArray,
  IsInt,
  IsPositive,
  IsBoolean,
  MinLength,
} from 'class-validator';

export class UpdateFuenteDto extends PartialType(CreateFuenteDto) {
  @IsUUID()
  @IsOptional()
  id: string;

  @IsString({ each: true })
  @IsArray()
  editores: string[];

  @IsInt()
  @IsPositive()
  frequency: number;

  @IsBoolean()
  @IsOptional()
  isOpen?: boolean;

  @IsString()
  @MinLength(2)
  materia: string;

  organization: string;

  @IsString()
  @MinLength(2)
  title: string;

  @IsString()
  @MinLength(2)
  url: string;
}
