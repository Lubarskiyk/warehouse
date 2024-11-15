import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class AuthDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsString({ message: 'Email address is required' })
  @IsEmail()
  email: string;

  @IsString({ message: 'Password is required' })
  @MinLength(6, { message: 'Min Length 6 symbols' })
  password: string;
}
