import {
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateFuenteDto {
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
