import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@entities/auth/auth.module';
import { UserModule } from '@entities/user/user.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, UserModule],
})
export class AppModule {}
