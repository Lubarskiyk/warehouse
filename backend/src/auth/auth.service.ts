import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from '@auth/dto';
import { UserService } from '@user/user.service';
import { Tokens } from '@auth/interfaces';
import { Prisma, Token, User } from '@prisma/client';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@prisma/prisma.service';
import { v4 } from 'uuid';
import { add } from 'date-fns';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async register(dto: RegisterDto) {
    try {
      const user: User | null = await this.userService.findOne(dto.login);

      if (user) {
        throw new ConflictException('Use r already exists');
      }

      return await this.userService.createUser(dto);
    } catch (error) {
      this.logger.error(`Register error: ${error.message}`, error.stack);
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Unexpected error during registration',
      );
    }
  }

  async login(dto: LoginDto): Promise<Tokens> {
    const user: User | null = await this.userService
      .findOne(dto.login)
      .catch((error) => {
        this.logger.error(error);
        return null;
      });

    if (!user || !user.password || !compareSync(dto.password, user.password)) {
      throw new UnauthorizedException('login or password failed');
    }
    return this.generateTokens(user);
  }

  async refreshTokens(refreshToken: string): Promise<Tokens> {
    const token = await this.prismaService.token.findUnique({
      where: { token: refreshToken },
    });
    if (!token) {
      throw new UnauthorizedException();
    }
    await this.prismaService.token.delete({ where: { token: refreshToken } });
    if (new Date(token.exp) < new Date()) {
      throw new UnauthorizedException();
    }

    const user = await this.userService.findOne(token.userId);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return this.generateTokens(user);
  }

  private async generateTokens(user: User): Promise<Tokens> {
    const accessToken = this.jwtService.sign({
      id: user.id,
      login: user.login,
      roles: user.roles,
    });

    const refreshToken = await this.getRefreshToken(user.id);

    return { accessToken, refreshToken };
  }

  private async getRefreshToken(userId: string): Promise<Token> {
    const token = await this.prismaService.token.findFirst({
      where: {
        userId: userId,
      },
    });

    if (token) {
      return this.prismaService.token.update({
        where: { token: token.token },
        data: {
          token: v4(),
          exp: add(new Date(), { days: 1 }),
        },
      });
    } else {
      return this.prismaService.token.create({
        data: {
          token: v4(),
          exp: add(new Date(), { days: 1 }),
          userId,
        } as Prisma.TokenUncheckedCreateInput,
      });
    }
  }

  deleteRefreshToken(token: string) {
    return this.prismaService.token.delete({ where: { token: token } });
  }
}
