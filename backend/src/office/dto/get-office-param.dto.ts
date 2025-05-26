import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetOfficeParamDto {
  @ApiProperty({ example: '2401', description: 'Внутрішній код офісу' })
  @IsString()
  @IsNotEmpty()
  code: string;
}

export class GetOfficeParamIdDto {
  @ApiProperty({ example: 'UUID', description: 'Id офісу' })
  @IsString()
  @IsNotEmpty()
  id: string;
}
