import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, firstValueFrom, retryWhen } from 'rxjs';
import { errorCatcher } from 'src/observables/error-catcher';
import { retry } from 'src/observables/http-retry';
import { DeleteSubscriptionResponseDto } from './dto/delete-subscription-response.dto';
import { SubscriptionResponseDto } from './dto/subscription-response.dto';

@Injectable()
export class StripeSubscriptionService {
  constructor(private readonly stripeHttpService: HttpService) {
    this.getSubscriptions().then((res) => {
      console.log(res);
    });
  }

  async createSubscription(
    dto: SubscriptionResponseDto,
  ): Promise<SubscriptionResponseDto> {
    const observable = await this.stripeHttpService
      .post<SubscriptionResponseDto>(`subscriptions`, dto)
      .pipe(retryWhen(retry()), catchError(errorCatcher));

    const response = await firstValueFrom(observable);
    return response?.data;
  }

  async getSubscriptionById(id: string): Promise<SubscriptionResponseDto> {
    const observable = await this.stripeHttpService
      .post<SubscriptionResponseDto>(`subscriptions/${id}`)
      .pipe(retryWhen(retry()), catchError(errorCatcher));

    const response = await firstValueFrom(observable);
    return response?.data;
  }

  async deleteSubscriptionById(
    id: string,
  ): Promise<DeleteSubscriptionResponseDto> {
    const observable = await this.stripeHttpService
      .delete<DeleteSubscriptionResponseDto>(`subscriptions/${id}`)
      .pipe(retryWhen(retry()), catchError(errorCatcher));

    const response = await firstValueFrom(observable);
    return response?.data;
  }

  async getSubscriptions(): Promise<SubscriptionResponseDto[]> {
    const observable = await this.stripeHttpService
      .get<SubscriptionResponseDto[]>('subscriptions')
      .pipe(retryWhen(retry()), catchError(errorCatcher));

    const response = await firstValueFrom(observable);
    return response?.data;
  }

  async getSubscriptionsSearch(
    query: string,
  ): Promise<SubscriptionResponseDto[]> {
    const observable = await this.stripeHttpService
      .get<SubscriptionResponseDto[]>(`subscriptions${query}`)
      .pipe(retryWhen(retry()), catchError(errorCatcher));

    const response = await firstValueFrom(observable);
    return response?.data;
  }
}
