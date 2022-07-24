import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, firstValueFrom, retryWhen } from 'rxjs';
import { errorCatcher } from 'src/observables/error-catcher';
import { retry } from 'src/observables/http-retry';
import { CreateCustomerRequestDto } from './dto/create-customer-request.dto';
import { CustomerResponseDto } from './dto/customer-response.dto';
import { deleteCustomerResponseDto } from './dto/delete-customer-response.dto';

@Injectable()
export class StripeCustomerService {
  constructor(private readonly stripeHttpService: HttpService) {}

  async createCustomer(
    dto: CreateCustomerRequestDto,
  ): Promise<CustomerResponseDto> {
    const observable = await this.stripeHttpService
      .post<CustomerResponseDto>(`customers`, dto)
      .pipe(retryWhen(retry()), catchError(errorCatcher));

    const response = await firstValueFrom(observable);
    return response?.data;
  }

  async getCustomerById(id: string): Promise<CustomerResponseDto> {
    const observable = await this.stripeHttpService
      .post<CustomerResponseDto>(`customers/${id}`)
      .pipe(retryWhen(retry()), catchError(errorCatcher));

    const response = await firstValueFrom(observable);
    return response?.data;
  }

  async deleteCustomerById(id: string): Promise<deleteCustomerResponseDto> {
    const observable = await this.stripeHttpService
      .delete<deleteCustomerResponseDto>(`customers/${id}`)
      .pipe(retryWhen(retry()), catchError(errorCatcher));

    const response = await firstValueFrom(observable);
    return response?.data;
  }

  async getCustomers(): Promise<CustomerResponseDto[]> {
    const observable = await this.stripeHttpService
      .get<CustomerResponseDto[]>('customers')
      .pipe(retryWhen(retry()), catchError(errorCatcher));

    const response = await firstValueFrom(observable);
    return response?.data;
  }

  async getCustomersSearch(query: string): Promise<CustomerResponseDto[]> {
    const observable = await this.stripeHttpService
      .get<CustomerResponseDto[]>(`customers${query}`)
      .pipe(retryWhen(retry()), catchError(errorCatcher));

    const response = await firstValueFrom(observable);
    return response?.data;
  }
}
