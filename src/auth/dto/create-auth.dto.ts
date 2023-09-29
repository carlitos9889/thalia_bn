import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
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
