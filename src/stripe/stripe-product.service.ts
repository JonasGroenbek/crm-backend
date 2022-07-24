import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, firstValueFrom, retryWhen } from 'rxjs';
import { errorCatcher } from 'src/observables/error-catcher';
import { retry } from 'src/observables/http-retry';
import { deleteProductResponseDto } from './dto/delete-product-response.dto';
import { ProductResponseDto } from './dto/product-response.dto';

@Injectable()
export class StripeProductService {
  constructor(private readonly stripeHttpService: HttpService) {
    this.getProducts().then((res) => {
      console.log(res);
    });
  }

  async createProduct(dto: ProductResponseDto): Promise<ProductResponseDto> {
    const observable = await this.stripeHttpService
      .post<ProductResponseDto>(`products`, dto)
      .pipe(retryWhen(retry()), catchError(errorCatcher));

    const response = await firstValueFrom(observable);
    return response?.data;
  }

  async getProductById(id: string): Promise<ProductResponseDto> {
    const observable = await this.stripeHttpService
      .post<ProductResponseDto>(`products/${id}`)
      .pipe(retryWhen(retry()), catchError(errorCatcher));

    const response = await firstValueFrom(observable);
    return response?.data;
  }

  async deleteProductById(id: string): Promise<deleteProductResponseDto> {
    const observable = await this.stripeHttpService
      .delete<deleteProductResponseDto>(`products/${id}`)
      .pipe(retryWhen(retry()), catchError(errorCatcher));

    const response = await firstValueFrom(observable);
    return response?.data;
  }

  async getProducts(): Promise<ProductResponseDto[]> {
    const observable = await this.stripeHttpService
      .get<ProductResponseDto[]>('products')
      .pipe(retryWhen(retry()), catchError(errorCatcher));

    const response = await firstValueFrom(observable);
    return response?.data;
  }

  async getProductsSearch(query: string): Promise<ProductResponseDto[]> {
    const observable = await this.stripeHttpService
      .get<ProductResponseDto[]>(`products${query}`)
      .pipe(retryWhen(retry()), catchError(errorCatcher));

    const response = await firstValueFrom(observable);
    return response?.data;
  }
}
