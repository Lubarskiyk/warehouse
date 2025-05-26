import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  Param,
  NotFoundException,
  Patch,
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
import { OfficeDto, PartialOfficeDto } from './dto/office.dto';
import {
  GetOfficeParamDto,
  GetOfficeParamIdDto,
} from './dto/get-office-param.dto';

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
    const office = await this.officeService.findByCode(params.code);
    if (!office) {
      throw new NotFoundException('Office not found');
    }
    return office;
  }

  @Get('/id/:id')
  @Public()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ summary: 'Отримати офіс за id' })
  @ApiParam({ name: 'id', description: 'Id офісу' })
  @ApiResponse({ status: 200, description: 'Офіс знайдено' })
  @ApiResponse({ status: 404, description: 'Офіс не знайдено' })
  async findOfficeById(@Param() params: GetOfficeParamIdDto) {
    const office = await this.officeService.findByCode(params.id);
    if (!office) {
      throw new NotFoundException('Office not found');
    }
    return office;
  }

  @Patch('/id/:id')
  @Public()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ summary: 'Оновити офіс за id' })
  @ApiParam({ name: 'id', description: 'Id офісу' })
  @ApiResponse({ status: 200, description: 'Офіс успішно оновлено' })
  @ApiResponse({ status: 404, description: 'Офіс не знайдено' })
  @ApiResponse({ status: 400, description: 'Помилка валідації' })
  @ApiResponse({ status: 500, description: 'Неочікувана помилка сервера' })
  async updateOfficeById(
    @Param() params: GetOfficeParamIdDto,
    @Body() dto: PartialOfficeDto,
  ) {
    return this.officeService.updateOffice(params.id, dto);
  }
}
