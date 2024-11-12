import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductArticleService } from './product-article.service';
import { CreateProductArticleDto } from './dto/create-product-article.dto';
import { UpdateProductArticleDto } from './dto/update-product-article.dto';

@Controller('product-article')
export class ProductArticleController {
  constructor(private readonly productArticleService: ProductArticleService) {}

  @Post()
  create(@Body() createProductArticleDto: CreateProductArticleDto) {
    return this.productArticleService.create(createProductArticleDto);
  }

  @Post('/more')
  createMore(
    @Body() moreProduct: [createProductArticleDto: CreateProductArticleDto],
  ) {
    return this.productArticleService.createMore(moreProduct);
  }

  @Get()
  findAll() {
    return this.productArticleService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.productArticleService.findOne(+id);
  // }

  @Get(':article')
  findOne(@Param('article') articleNumber: number) {
    return this.productArticleService.findOneByArticleNumber(+articleNumber);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductArticleDto: UpdateProductArticleDto,
  ) {
    return this.productArticleService.update(+id, updateProductArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productArticleService.remove(+id);
  }
}
