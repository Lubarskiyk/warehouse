import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { OfficeDto } from './dto/office.dto';

@Injectable()
export class OfficeService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return this.prismaService.office.findMany();
  }

  async findOne(code: string) {
    const office = await this.prismaService.office.findFirst({
      where: { code },
    });

    if (!office) {
      return null;
    }
    return office;
  }

  async createOffice(officeDto: OfficeDto) {
    try {
      const office = await this.findOne(officeDto.code);
      if (office) {
        throw new ConflictException('Office already exists');
      }
      return await this.prismaService.office.create({
        data: {
          name: officeDto.name,
          code: officeDto.code,
          city: officeDto.city ?? null,
          phone: officeDto.phone ?? null,
          address: officeDto.address ?? null,
        },
      });
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Unexpected error during registration',
      );
    }
  }
}
