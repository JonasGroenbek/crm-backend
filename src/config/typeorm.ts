import { ConfigService, registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { APP_DB_RELATIVE_PATH, TSC_DB_RELATIVE_PATH } from './constants';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

//used for application
export const APP_DB_CONFIG: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.APP_DB_HOST,
  port: +process.env.APP_DB_PORT,
  database: process.env.APP_DB_DATABASE,
  username: process.env.APP_DB_USER,
  password: process.env.APP_DB_PASSWORD,
  entities: ['dist/**/*.entity{.ts,.js}'],
  schema: 'public',
  logging: true,
  synchronize: true,
  autoLoadEntities: true,
  migrations: [`${APP_DB_RELATIVE_PATH}/migrations/*{.ts,.js}`],
  name: 'app',
};

//used for ConfigModule
export const appConfig = registerAs(
  APP_DB_CONFIG.name,
  (): TypeOrmModuleOptions => APP_DB_CONFIG,
);

//used for TypeormModule
export const appTypeormConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  return configService.get<TypeOrmModuleOptions>(APP_DB_CONFIG.name);
};

//used for application
export const TSC_DB_CONFIG: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.TSC_DB_HOST,
  port: +process.env.TSC_DB_PORT,
  database: process.env.TSC_DB_DATABASE,
  username: process.env.TSC_DB_USER,
  password: process.env.TSC_DB_PASSWORD,
  entities: ['dist/**/*.entity{.ts,.js}'],
  schema: 'public',
  logging: false,
  synchronize: true,
  autoLoadEntities: true,
  migrations: [`${TSC_DB_RELATIVE_PATH}/migrations/*{.ts,.js}`],
  name: 'tsc',
};

//used for ConfigModule
export const tscConfig = registerAs(
  TSC_DB_CONFIG.name,
  (): TypeOrmModuleOptions => TSC_DB_CONFIG,
);

//used for TypeOrmModule
export const tscTypeormConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  return configService.get<TypeOrmModuleOptions>(TSC_DB_CONFIG.name);
};
