import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/identity/guards/jwt.guard';
import { API_PREFIX } from './constants';
import { GetManyProductsDto } from './dto/get-many.dto';
import { ProductService } from './product.service';

@Controller(API_PREFIX)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getMany(
    @Query(
      new ValidationPipe({
        expectedType: GetManyProductsDto,
        transform: true,
      }),
    )
    query: GetManyProductsDto,
  ) {
    return this.productService.getMany(query);
  }

  @Get(`:id`)
  @UseGuards(JwtAuthGuard)
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.productService.getById(id);
  }
}
