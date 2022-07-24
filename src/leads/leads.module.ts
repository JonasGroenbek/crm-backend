import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_DB_CONFIG } from 'src/config/typeorm.config';
import { LeadController } from './leads.controller';
import { Lead } from './leads.entity';
import { LeadService } from './leads.service';

@Module({
  imports: [TypeOrmModule.forFeature([Lead], APP_DB_CONFIG.name)],
  controllers: [LeadController],
  providers: [LeadService],
  exports: [LeadService],
})
export class LeadModule {}
