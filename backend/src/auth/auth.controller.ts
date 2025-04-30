import {
  Controller,
  Post,
  Body,
  Get,
  BadRequestException,
  UnauthorizedException,
  Res,
  HttpStatus,
  UseInterceptors,
  ClassSerializerInterceptor,
  Logger,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiCookieAuth,
} from '@nestjs/swagger';

import { LoginDto, RegisterDto } from '@auth/dto';
import { AuthService } from '@auth/auth.service';
import { Tokens } from '@auth/interfaces';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { Cookie, Public } from '@common/decorators';
import { UserResponse } from '@user/responses';

const REFRESH_TOKEN = 'refresh_token';

@ApiTags('Auth')
@Public()
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  @ApiOperation({ summary: 'Регистрация нового пользователя' })
  @ApiResponse({
    status: 201,
    description: 'Пользователь успешно зарегистрирован',
    type: UserResponse,
  })
  @ApiResponse({ status: 409, description: 'Пользователь уже существует' })
  @ApiResponse({ status: 500, description: 'Неожиданная ошибка' })
  async register(@Body() dto: RegisterDto) {
    try {
      const user = await this.authService.register(dto);
      if (!user) {
        throw new BadRequestException('Не удалось создать пользователя');
      }
      return new UserResponse(user);
    } catch (error) {
      this.logger.error(`Failed to register user: ${dto.login}`, error.stack);
      throw error;
    }
  }

  @Post('login')
  @ApiOperation({ summary: 'Авторизация пользователя' })
  @ApiResponse({
    status: 201,
    description: 'Успешный вход. Access token в ответе. Refresh в куках',
  })
  @ApiResponse({ status: 400, description: 'Ошибка входа' })
  async login(@Body() dto: LoginDto, @Res() res: Response) {
    const tokens = await this.authService.login(dto);
    if (!tokens) {
      throw new BadRequestException(`login failed ${JSON.stringify(dto)}`);
    }
    this.setRefreshTokenCookies(tokens, res);
  }

  @Get('logout')
  @ApiOperation({ summary: 'Выход пользователя (удаление refresh токена)' })
  @ApiResponse({ status: 200, description: 'Успешный выход' })
  async logout(
    @Cookie(REFRESH_TOKEN) refreshToken: string,
    @Res() res: Response,
  ) {
    if (!refreshToken) {
      res.sendStatus(HttpStatus.OK);
      return;
    }
    await this.authService.deleteRefreshToken(refreshToken);
    res.cookie(REFRESH_TOKEN, '', {
      httpOnly: true,
      secure: true,
      expires: new Date(),
    });
    res.sendStatus(HttpStatus.OK);
  }

  @Get('refresh-tokens')
  @ApiCookieAuth()
  @ApiOperation({ summary: 'Обновление access и refresh токенов' })
  @ApiResponse({ status: 201, description: 'Новые токены выданы' })
  @ApiResponse({
    status: 401,
    description: 'Неавторизован или refresh токен невалиден',
  })
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
