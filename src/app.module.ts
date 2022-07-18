import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  appTypeormConfig,
  APP_CONFIG,
  APP_DB_CONFIG,
  tscTypeormConfig,
  TSC_CONFIG,
  TSC_DB_CONFIG,
} from './config/typeorm';
import { ConnectionsModule } from './connections/connections.module';
import { DealsModule } from './deals/deals.module';
import { DocumentsModule } from './documents/documents.module';
import { ResponseExceptionFilter } from './filters/response-exception-filter';
import { IdentityModule } from './identity/identity.module';
import { LeadsModule } from './leads/leads.module';
import { MailsModule } from './mails/mails.module';
import { SettingsModule } from './settings/settings.module';
import { TasksModule } from './tasks/tasks.module';
import { TscModule } from './tsc/tsc.module';

@Module({
  imports: [
    ConnectionsModule,
    DealsModule,
    DocumentsModule,
    LeadsModule,
    MailsModule,
    SettingsModule,
    TasksModule,
    TscModule,
    IdentityModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [TSC_CONFIG, APP_CONFIG],
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
