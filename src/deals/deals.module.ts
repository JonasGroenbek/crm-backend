import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_DB_CONFIG } from 'src/config/typeorm.config';
import { DealController } from './deals.controller';
import { Deal } from './deals.entity';
import { DealService } from './deals.service';

@Module({
  imports: [TypeOrmModule.forFeature([Deal], APP_DB_CONFIG.name)],
  controllers: [DealController],
  providers: [DealService],
  exports: [DealService],
})
export class DealModule {}
