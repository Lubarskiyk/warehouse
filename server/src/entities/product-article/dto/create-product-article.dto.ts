import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateProductArticleDto {
  @IsNumber()
  @IsNotEmpty()
  articleNumber: number;

  @IsString()
  @MinLength(3, { message: 'Min Length 3 symbols' })
  articleName: string;

  @IsNumber()
  @IsNotEmpty()
  countOne: number;

  @IsNumber()
  @IsNotEmpty()
  normOne: number;

  @IsNumber()
  @IsNotEmpty()
  countTwo: number;

  @IsNumber()
  @IsNotEmpty()
  normTwo: number;

  @IsNumber()
  @IsNotEmpty()
  countThree: number;

  @IsNumber()
  @IsNotEmpty()
  normThree: number;

  @IsNumber()
  @IsNotEmpty()
  countFour: number;

  @IsNumber()
  @IsNotEmpty()
  normFour: number;

  @IsString()
  @MaxLength(12, { message: 'Max Length 12 symbols' })
  storageLocation: string;

  @IsString()
  @MaxLength(50, { message: 'Max Length 50 symbols' })
  comment: string;
}
