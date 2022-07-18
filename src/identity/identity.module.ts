import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TSC_DB_CONFIG } from 'src/config/typeorm';
import { IdentityController } from './identity.controller';
import { Identity } from './identity.entity';
import { IdentityService } from './identity.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

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
  controllers: [IdentityController],
  providers: [IdentityService, JwtStrategy, LocalStrategy],
  exports: [IdentityService],
})
export class IdentityModule {}
