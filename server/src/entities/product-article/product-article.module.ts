import { Module } from '@nestjs/common';
import { ProductArticleService } from './product-article.service';
import { ProductArticleController } from './product-article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@entities/user/entities/user.entity';
import { ProductArticle } from '@entities/product-article/entities/product-article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductArticle])],
  controllers: [ProductArticleController],
  providers: [ProductArticleService],
})
export class ProductArticleModule {}
