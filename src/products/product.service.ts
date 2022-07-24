import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { APP_DB_CONFIG } from 'src/config/typeorm.config';
import { Repository } from 'typeorm';
import { GetManyProductsDto } from './dto/get-many.dto';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product, APP_DB_CONFIG.name)
    private readonly leadRepository: Repository<Product>,
  ) {}

  async getById(id: number) {
    return this.leadRepository.findOne({ where: { id } });
  }

  async getMany({
    limit = 50,
    offset = 0,
  }: GetManyProductsDto): Promise<{ count: number; products: Product[] }> {
    const query = this.leadRepository.createQueryBuilder('product');

    query.skip(offset);
    query.take(limit);

    const [products, count] = await query.getManyAndCount();

    return {
      count: count,
      products,
    };
  }
}
