import {
  Controller,
  Post,
  Body,
  Get,
  BadRequestException,
  UnauthorizedException,
  Res,
  HttpStatus,
} from '@nestjs/common';

import { LoginDto, RegisterDto } from '@auth/dto';
import { AuthService } from '@auth/auth.service';
import { Tokens } from '@auth/interfaces';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { Cookie } from '@common/decorators';

const REFRESH_TOKEN = 'refresh_token';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const user = await this.authService.register(dto);

    if (!user) {
      throw new BadRequestException(`register failed ${JSON.stringify(dto)}`);
    }
  }

  @Post('login')
  async login(@Body() dto: LoginDto, @Res() res: Response) {
    const tokens = await this.authService.login(dto);
    if (!tokens) {
      throw new BadRequestException(`login failed ${JSON.stringify(dto)}`);
    }
    this.setRefreshTokenCookies(tokens, res);
  }

  @Get('refresh-tokens')
  async refreshTokens(
    @Cookie(REFRESH_TOKEN) refreshToken: string,
    @Res() res: Response,
  ) {
    if (!refreshToken) {
      throw new UnauthorizedException();
    }
    const tokens = await this.authService.refreshTokens(refreshToken);

    if (!tokens) {
      throw new UnauthorizedException();
    }
    this.setRefreshTokenCookies(tokens, res);
  }

  private setRefreshTokenCookies(tokens: Tokens, res: Response) {
    if (!tokens) {
      throw new UnauthorizedException();
    }
    res.cookie(REFRESH_TOKEN, tokens.refreshToken.token, {
      httpOnly: true,
      sameSite: 'lax',
      expires: new Date(tokens.refreshToken.exp),
      secure:
        this.configService.get('NODE_ENV', 'development') === 'production',
      path: '/',
    });
    res.status(HttpStatus.CREATED).json({ accessToken: tokens.accessToken });
  }
}
