import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  Validate,
} from 'class-validator';
import { IsPasswordsMatchingConstraint } from '@common/decorators';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    example: 'User@example.com',
    description: 'Email пользователя',
  })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({
    example: 'securePass123',
    minLength: 6,
    description: 'Пароль пользователя',
  })
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'securePass123',
    minLength: 6,
    description: 'Повтор пароля (должен совпадать с password)',
  })
  @IsString()
  @MinLength(6)
  @Validate(IsPasswordsMatchingConstraint)
  @IsNotEmpty()
  passwordRepeat: string;
}
