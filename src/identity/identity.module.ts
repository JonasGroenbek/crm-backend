import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TSC_DB_CONFIG } from 'src/config/typeorm';
import { IdController } from './identity.controller';
import { Identity } from './identity.entity';
import { IdentityService } from './identity.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Identity], TSC_DB_CONFIG.name),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES') },
        };
      },
    }),
  ],
  controllers: [IdController],
  providers: [IdentityService],
  exports: [IdentityService],
})
export class Idmodule {}
