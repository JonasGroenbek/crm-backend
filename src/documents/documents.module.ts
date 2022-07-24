import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_DB_CONFIG } from 'src/config/typeorm.config';
import { DocumentController } from './documents.controller';
import { Document } from './documents.entity';
import { DocumentService } from './documents.service';

@Module({
  imports: [TypeOrmModule.forFeature([Document], APP_DB_CONFIG.name)],
  controllers: [DocumentController],
  providers: [DocumentService],
  exports: [DocumentService],
})
export class DocumentModule {}
