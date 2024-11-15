import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@entities/auth/auth.module';
import { UserModule } from '@entities/user/user.module';
import { WarehoseModule } from './warehose/warehose.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, UserModule, WarehoseModule],
})
export class AppModule {}
