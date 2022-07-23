import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { APP_DB_CONFIG } from 'src/config/typeorm';
import { Repository } from 'typeorm';
import { Document } from './documents.entity';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document, APP_DB_CONFIG.name)
    private readonly documents: Repository<Document>,
  ) {}
}
