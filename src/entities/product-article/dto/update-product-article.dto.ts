import { PartialType } from '@nestjs/mapped-types';
import { CreateProductArticleDto } from './create-product-article.dto';

export class UpdateProductArticleDto extends PartialType(CreateProductArticleDto) {}
