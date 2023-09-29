import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-auth.dto';
import { IsString, IsEmail, MinLength } from 'class-validator';

export class UpdateUserhDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}
