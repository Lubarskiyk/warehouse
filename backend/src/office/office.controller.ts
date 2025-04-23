import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { OfficeService } from './office.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from '@common/decorators';

@ApiTags('Office')
@ApiBearerAuth()
@Controller('office')
export class OfficeController {
  constructor(private readonly officeService: OfficeService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  @Public()
  async findAllOffice() {
    return this.officeService.findAll();
  }
}
