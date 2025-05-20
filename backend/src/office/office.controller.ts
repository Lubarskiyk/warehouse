import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { OfficeService } from './office.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from '@common/decorators';
import { OfficeDto } from './dto/office.dto';
import { GetOfficeParamDto } from './dto/get-office-param.dto';

@ApiTags('Office')
@ApiBearerAuth()
@Controller('office')
export class OfficeController {
  constructor(private readonly officeService: OfficeService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  @Public()
  @ApiOperation({ summary: 'Отримати список усіх офісів' })
  @ApiResponse({ status: 200, description: 'Список офісів успішно отримано' })
  @ApiResponse({ status: 500, description: 'Неочікувана помилка сервера' })
  async findAllOffice() {
    return this.officeService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @Public()
  @ApiOperation({ summary: 'Створити новий офіс' })
  @ApiResponse({ status: 201, description: 'Офіс успішно створено' })
  @ApiResponse({ status: 409, description: 'Офіс з таким кодом вже існує' })
  @ApiResponse({ status: 400, description: 'Помилка валідації вхідних даних' })
  @ApiResponse({ status: 500, description: 'Неочікувана помилка сервера' })
  async create(@Body() dto: OfficeDto) {
    return this.officeService.createOffice(dto);
  }

  @Get(':code')
  @Public()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ summary: 'Отримати офіс за кодом' })
  @ApiParam({ name: 'code', description: 'Внутрішній код офісу' })
  @ApiResponse({ status: 200, description: 'Офіс знайдено' })
  @ApiResponse({ status: 404, description: 'Офіс не знайдено' })
  async findOneOffice(@Param() params: GetOfficeParamDto) {
    const office = await this.officeService.findOne(params.code);
    if (!office) {
      throw new NotFoundException('Office not found');
    }
    return office;
  }
}
