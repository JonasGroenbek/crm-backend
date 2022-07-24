import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, firstValueFrom, retryWhen } from 'rxjs';
import { errorCatcher } from 'src/observables/error-catcher';
import { retry } from 'src/observables/http-retry';
import { BalanceResponseDto } from './dto/balance-response.dto';

@Injectable()
export class StripeBalanceService {
  constructor(private readonly stripeHttpService: HttpService) {
    this.getBalance();
  }

  async getBalance(): Promise<BalanceResponseDto> {
    const observable = await this.stripeHttpService
      .get<BalanceResponseDto>('balance')
      .pipe(retryWhen(retry()), catchError(errorCatcher));

    const response = await firstValueFrom(observable);
    return response?.data;
  }
}
