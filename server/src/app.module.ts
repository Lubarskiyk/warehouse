import { Module } from '@nestjs/common';

import { UserModule } from '@entities/user/user.module';
import { ProductArticleModule } from '@entities/product-article/product-article.module';
import { AuthModule } from '@entities/auth/auth.module';
import { UserRoleModule } from '@entities/user-role/user-role.module';
import { ConfigModule } from './config.module';
import { TypeOrmModule } from '@db/typeorm.module';

@Module({
  imports: [
    ConfigModule,
    UserModule,
    ProductArticleModule,
    AuthModule,
    UserRoleModule,
    TypeOrmModule,
  ],
})
export class AppModule {}
