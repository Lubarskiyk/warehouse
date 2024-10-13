import { Injectable } from '@nestjs/common';
import { CreateProductArticleDto } from './dto/create-product-article.dto';
import { UpdateProductArticleDto } from './dto/update-product-article.dto';

@Injectable()
export class ProductArticleService {
  create(createProductArticleDto: CreateProductArticleDto) {
    return 'This action adds a new productArticle';
  }

  findAll() {
    return `This action returns all productArticle`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productArticle`;
  }

  update(id: number, updateProductArticleDto: UpdateProductArticleDto) {
    return `This action updates a #${id} productArticle`;
  }

  remove(id: number) {
    return `This action removes a #${id} productArticle`;
  }
}
