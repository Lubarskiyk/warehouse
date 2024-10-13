import { Module } from '@nestjs/common';
import { ProductArticleService } from './product-article.service';
import { ProductArticleController } from './product-article.controller';

@Module({
  controllers: [ProductArticleController],
  providers: [ProductArticleService],
})
export class ProductArticleModule {}
