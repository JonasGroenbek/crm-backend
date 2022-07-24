import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StripeBalanceService } from './stripe-balance.service';
import { StripeCustomerService } from './stripe-customer.service';
import { StripeProductService } from './stripe-product.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        baseURL: 'https://api.stripe.com/v1/',
        headers: {
          Authorization: `Bearer ${configService.get<string>(
            'stripe.secretKey',
          )}`,
          'Content-Type': 'application/json',
        },
      }),
    }),
  ],
  providers: [
    StripeBalanceService,
    StripeCustomerService,
    StripeProductService,
  ],
  exports: [StripeBalanceService, StripeCustomerService, StripeProductService],
})
export class StripeModule {}
