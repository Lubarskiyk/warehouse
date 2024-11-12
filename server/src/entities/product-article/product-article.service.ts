import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductArticleDto } from './dto/create-product-article.dto';
import { UpdateProductArticleDto } from './dto/update-product-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductArticle } from '@entities/product-article/entities/product-article.entity';
import { Repository } from 'typeorm';
import { isArray } from 'class-validator';

@Injectable()
export class ProductArticleService {
  constructor(
    @InjectRepository(ProductArticle)
    private readonly productRepository: Repository<ProductArticle>,
  ) {}

  async create(createProductArticleDto: CreateProductArticleDto) {
    const existProduct = await this.productRepository.findOne({
      where: { articleNumber: createProductArticleDto.articleNumber },
    });
    if (existProduct) throw new BadRequestException('Product already exists');
    const newProduct = await this.productRepository.save(
      createProductArticleDto,
    );
    return { status: 'ok', product: newProduct };
  }

  async createMore(
    moreProduct: [createProductArticleDto: CreateProductArticleDto],
  ) {
    let addItem = 0;
    if (!moreProduct) throw new BadRequestException('More product is required');
    if (!isArray(moreProduct)) throw new BadRequestException('Bad');
    for (const item of moreProduct) {
      const existProduct = await this.productRepository.findOne({
        where: { articleNumber: item.articleNumber },
      });
      if (existProduct) continue;
      await this.productRepository.save(item);
      addItem = addItem + 1;
    }
    return addItem;
  }

  async findOneByArticleNumber(articleNumber: number) {
    const existProduct = await this.productRepository.findOne({
      where: { articleNumber },
    });
    if (!existProduct) throw new BadRequestException('Product already exists');
    return existProduct;
  }

  async findAll() {
    const allProduct = await this.productRepository.find();
    if (!allProduct) throw new BadRequestException('Product already exists');
    return allProduct;
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
