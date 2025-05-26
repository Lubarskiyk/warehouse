import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class OfficeDto {
  @ApiProperty({ example: 'Львів склад', description: 'Назва офісу' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '2401', description: 'Внутрішній код офісу' })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    example: 'Львів',
    description: 'Місто розташування офісу',
    required: false,
  })
  @IsString()
  city?: string;

  @ApiProperty({
    example: '+3806711111111',
    description: 'Телефон офісу',
    required: false,
  })
  @IsString()
  phone?: string;

  @ApiProperty({
    example: 'вул Шевченка 6',
    description: 'Адреса офісу',
    required: false,
  })
  @IsString()
  address?: string;
}

export class PartialOfficeDto extends PartialType(OfficeDto) {}
