import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetOfficeParamDto {
  @ApiProperty({ example: '2401', description: 'Внутрішній код офісу' })
  @IsString()
  @IsNotEmpty()
  code: string;
}
