import { registerAs } from '@nestjs/config';
interface JwtConfiguration {
  expiresIn: number;
  secret: string;
}

export const JWT_CONFIG = registerAs(
  'jwt',
  (): JwtConfiguration => ({
    expiresIn: Number(process.env.JWT_EXPIRES),
    secret: process.env.JWT_SECRET,
  }),
);
