import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '@user/user.module';
import { PrismaModule } from '@prisma/prisma.module';
import { AuthModule } from '@auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@auth/guargs/jwt-auth.guard';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
