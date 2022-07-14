import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  appTypeormConfig,
  APP_CONFIG,
  APP_DB_CONFIG,
  tscTypeormConfig,
  TSC_CONFIG,
  TSC_DB_CONFIG,
} from './config/typeorm';
import { Idmodule } from './id/id.module';
import { TscModule } from './tsc/tsc.module';

@Module({
  imports: [
    TscModule,
    Idmodule,
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
})
export class AppModule {}
