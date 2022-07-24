import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, firstValueFrom, retryWhen } from 'rxjs';
import { errorCatcher } from 'src/observables/error-catcher';
import { retry } from 'src/observables/http-retry';
import { CreateSessionRequestDto } from './dto/create-session-request.dto';
import { SessionResponseDto } from './dto/session-response.dto';
import Stripe from 'stripe';

@Injectable()
export class StripeSessionService {
  constructor(private readonly stripeHttpService: HttpService) {
    const stripeClient = new Stripe(
      `sk_test_51LOdXVFGKuF18j39m97aHHh93sEGudR4KYKkyKGuyRzRnDeIzp36lqOtQxkqUedlOmvgqvyQlnoOSTlGi9PBYR5V00yFuoIPZ7`,
      {
        apiVersion: '2020-08-27',
        typescript: true,
      },
    );
  }

  async createSession(
    dto: CreateSessionRequestDto,
  ): Promise<SessionResponseDto> {
    const observable = await this.stripeHttpService
      .post<SessionResponseDto>(`sessions`, dto)
      .pipe(retryWhen(retry()), catchError(errorCatcher));

    const response = await firstValueFrom(observable);
    return response?.data;
  }

  async getSessionById(id: string): Promise<SessionResponseDto> {
    const observable = await this.stripeHttpService
      .post<SessionResponseDto>(`sessions/${id}`)
      .pipe(retryWhen(retry()), catchError(errorCatcher));

    const response = await firstValueFrom(observable);
    return response?.data;
  }

  async getSessions(): Promise<SessionResponseDto[]> {
    const observable = await this.stripeHttpService
      .get<SessionResponseDto[]>('sessions')
      .pipe(retryWhen(retry()), catchError(errorCatcher));

    const response = await firstValueFrom(observable);
    return response?.data;
  }

  async getSessionsSearch(query: string): Promise<SessionResponseDto[]> {
    const observable = await this.stripeHttpService
      .get<SessionResponseDto[]>(`sessions${query}`)
      .pipe(retryWhen(retry()), catchError(errorCatcher));

    const response = await firstValueFrom(observable);
    return response?.data;
  }
}
