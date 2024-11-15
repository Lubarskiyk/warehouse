import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@entities/auth/guardts/jwt-auth.guard';

export const Auth = () => UseGuards(JwtAuthGuard);
