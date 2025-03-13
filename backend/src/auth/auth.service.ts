import {
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from '@auth/dto';
import { UserService } from '@user/user.service';
import { Tokens } from '@auth/interfaces';
import { Token, User } from '@prisma/client';
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
    const user: User | null = await this.userService
      .findOne(dto.email)
      .catch((error) => {
        this.logger.error(error);
        return null;
      });
    if (user) {
      throw new ConflictException('User already exists');
    }
    try {
      return this.userService.save(dto);
    } catch (error) {
      this.logger.error(error);
      return null;
    }
  }

  async login(dto: LoginDto): Promise<Tokens> {
    const user: User | null = await this.userService
      .findOne(dto.email)
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
    const token = await this.prismaService.token.delete({
      where: { token: refreshToken },
    });
    if (!token) {
      throw new UnauthorizedException();
    }
    const user = await this.userService.findOne(token.userId);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return this.generateTokens(user);
  }

  private async generateTokens(user: User): Promise<Tokens> {
    const accessToken =
      'Bearer ' +
      this.jwtService.sign({
        id: user.id,
        email: user.email,
        roles: user.roles,
      });

    const refreshToken = await this.getRefreshToken(user.id);

    return { accessToken, refreshToken };
  }

  private async getRefreshToken(userId: string): Promise<Token> {
    return this.prismaService.token.create({
      data: {
        token: v4(),
        exp: add(new Date(), { days: 1 }),
        userId,
      },
    });
  }
}
