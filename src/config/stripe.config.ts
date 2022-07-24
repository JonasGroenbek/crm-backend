import { registerAs } from '@nestjs/config';

interface StripeConfiguration {
  secretKey: string;
  publishableKey: string;
}

export const stripConfig = registerAs(
  'stripe',
  (): StripeConfiguration => ({
    secretKey: process.env.STRIPE_SECRET_KEY,
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  }),
);
