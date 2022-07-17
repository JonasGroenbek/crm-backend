import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_DB_CONFIG } from 'src/config/typeorm';
import { DealsController } from './deals.controller';
import { Deals } from './deals.entity';
import { DealsService } from './deals.service';

@Module({
  imports: [TypeOrmModule.forFeature([Deals], APP_DB_CONFIG.name)],
  controllers: [DealsController],
  providers: [DealsService],
  exports: [DealsService],
})
export class DealsModule {}
