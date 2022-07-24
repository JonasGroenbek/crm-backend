import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_DB_CONFIG } from 'src/config/typeorm.config';
import { StripeModule } from 'src/stripe/stripe.module';
import { Tenant } from 'src/tenant/tenant.entity';
import { TenantModule } from 'src/tenant/tenant.module';
import { IdentityController } from './identity.controller';
import { Identity } from './identity.entity';
import { IdentityService } from './identity.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Identity, Tenant], APP_DB_CONFIG.name),
    TenantModule,
    StripeModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('jwt.secret'),
          signOptions: {
            expiresIn: configService.get<string>('jwt.expiresIn'),
          },
        };
      },
    }),
  ],
  controllers: [IdentityController],
  providers: [IdentityService, JwtStrategy, LocalStrategy],
  exports: [IdentityService],
})
export class IdentityModule {}
