import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-auth.dto';
import {
  IsString,
  IsEmail,
  MinLength,
  IsUUID,
  IsOptional,
} from 'class-validator';

export class UpdateUserhDto extends PartialType(CreateUserDto) {
  @IsUUID()
  @IsOptional()
  id: string;

  @IsString()
  @MinLength(1)
  username: string;

  @IsString()
  @MinLength(1)
  lastName: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString({ each: true })
  role: string[];

  @IsString()
  @MinLength(1)
  organismo: string;

  @IsString()
  @MinLength(1)
  address: string;
}
