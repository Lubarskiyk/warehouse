import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @MinLength(6, { message: 'Min Length 3 symbols' })
  password: string;

  @IsString()
  @MinLength(3, { message: 'Min Length 3 symbols' })
  nameFirst: string;

  @IsString()
  @MinLength(3, { message: 'Min Length 3 symbols' })
  nameLast: string;
}
