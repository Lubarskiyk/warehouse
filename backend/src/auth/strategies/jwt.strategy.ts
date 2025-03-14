import { JwtPayload } from '@auth/interfaces';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { UserService } from '@user/user.service';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);
  constructor(
    configService: ConfigService,
    private readonly userService: UserService,
  ) {
    const jwtSecret = configService.get<string>('JWT_SECRET');

    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: JwtPayload) {
    try {
      const user: User | null = await this.userService.findOne(payload.id);

      if (!user || user.isBlocked) {
        throw new UnauthorizedException();
      }

      return payload;
    } catch (error) {
      this.logger.error(error);
      throw new UnauthorizedException();
    }
  }
}
