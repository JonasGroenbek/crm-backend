import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConfig } from './config/jwt';
import {
  appConfig,
  appTypeormConfig,
  APP_DB_CONFIG,
  tscConfig,
  tscTypeormConfig,
  TSC_DB_CONFIG,
} from './config/typeorm';
import { ContactModule } from './contact/contact.module';
import { DealModule } from './deals/deals.module';
import { DocumentModule } from './documents/documents.module';
import { ResponseExceptionFilter } from './filters/response-exception-filter';
import { IdentityModule } from './identity/identity.module';
import { LeadModule } from './leads/leads.module';
import { MailModule } from './mails/mails.module';
import { OrganizationModule } from './organization/organization.module';
import { SettingsModule } from './settings/settings.module';
import { TaskModule } from './tasks/tasks.module';
import { TscModule } from './tsc/tsc.module';

@Module({
  imports: [
    OrganizationModule,
    ContactModule,
    DealModule,
    DocumentModule,
    LeadModule,
    MailModule,
    SettingsModule,
    TaskModule,
    TscModule,
    IdentityModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [tscConfig, appConfig, jwtConfig],
    }),
    TypeOrmModule.forRootAsync({
      name: APP_DB_CONFIG.name,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        appTypeormConfig(configService),
    }),
    TypeOrmModule.forRootAsync({
      name: TSC_DB_CONFIG.name,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        tscTypeormConfig(configService),
    }),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ResponseExceptionFilter,
    },
  ],
})
export class AppModule {}
