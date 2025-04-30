import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { Role, User } from '@prisma/client';
import { genSaltSync, hashSync } from 'bcrypt';
import { JwtPayload } from '@auth/interfaces';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async createUser(user: Partial<User>) {
    if (!user.password || !user.login) return null;

    const hashedPassword = this.hashPassword(user.password);

    return this.prismaService.user.create({
      data: {
        login: user.login,
        password: hashedPassword,
        roles: ['USER'],
      },
    });
  }

  async findOne(idOrLogin: string) {
    const user = await this.cacheManager.get<User>(idOrLogin);
    if (!user) {
      const user = await this.prismaService.user.findFirst({
        where: { OR: [{ id: idOrLogin }, { login: idOrLogin }] },
      });
      if (!user) {
        return null;
      }
      await this.cacheManager.set<User>(idOrLogin, user);
      return user;
    }

    return user;
  }

  async findAll() {
    return this.prismaService.user.findMany();
  }

  delete(id: string, user: JwtPayload) {
    if (user.id !== id && !user.roles.includes(Role.ADMIN)) {
      throw new ForbiddenException();
    }
    return this.prismaService.user.delete({
      where: { id },
      select: { id: true },
    });
  }

  private hashPassword(password: string) {
    return hashSync(password, genSaltSync(10));
  }
}
