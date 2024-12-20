import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { hash } from 'argon2';
import { AuthDto } from '@entities/auth/dto/auth.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        warehouses: true,
      },
    });
    return user;
  }

  async getByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        warehouses: true,
      },
    });
    return user;
  }

  async create(dto: AuthDto) {
    return await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: await hash(dto.password),
      },
    });
  }
}
