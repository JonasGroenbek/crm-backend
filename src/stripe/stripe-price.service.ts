import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, firstValueFrom, retryWhen } from 'rxjs';
import { errorCatcher } from 'src/observables/error-catcher';
import { retry } from 'src/observables/http-retry';
import { PriceResponseDto } from './dto/price-response.dto';
import { CreatePriceRequestDto } from './dto/create-price-request.dto';

@Injectable()
export class StripePriceService {
  constructor(private readonly stripeHttpService: HttpService) {}

  async createPrice(dto: CreatePriceRequestDto): Promise<PriceResponseDto> {
    const observable = await this.stripeHttpService
      .post<PriceResponseDto>(`prices`, dto)
      .pipe(retryWhen(retry()), catchError(errorCatcher));

    const response = await firstValueFrom(observable);
    return response?.data;
  }

  async getPriceById(id: string): Promise<PriceResponseDto> {
    const observable = await this.stripeHttpService
      .post<PriceResponseDto>(`prices/${id}`)
      .pipe(retryWhen(retry()), catchError(errorCatcher));

    const response = await firstValueFrom(observable);
    return response?.data;
  }

  async getPrices(): Promise<PriceResponseDto[]> {
    const observable = await this.stripeHttpService
      .get<PriceResponseDto[]>('prices')
      .pipe(retryWhen(retry()), catchError(errorCatcher));

    const response = await firstValueFrom(observable);
    return response?.data;
  }

  async getPricesSearch(query: string): Promise<PriceResponseDto[]> {
    const observable = await this.stripeHttpService
      .get<PriceResponseDto[]>(`prices${query}`)
      .pipe(retryWhen(retry()), catchError(errorCatcher));

    const response = await firstValueFrom(observable);
    return response?.data;
  }
}
