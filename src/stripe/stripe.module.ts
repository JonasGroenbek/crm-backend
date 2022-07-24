import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { StripeService } from './stripe-service';

@Module({
  providers: [
    {
      provide: 'STRIPE',
      useFactory: async (configService: ConfigService) => {
        const stripe = new Stripe(
          configService.get<string>('stripe.secretKey'),
          { apiVersion: '2020-08-27' },
        );
        return stripe;
      },
      inject: [ConfigService],
    },
    StripeService,
  ],
  exports: [StripeService],
})
export class StripeModule {}
