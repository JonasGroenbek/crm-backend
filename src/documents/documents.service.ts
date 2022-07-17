import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { APP_DB_CONFIG } from 'src/config/typeorm';
import { Repository } from 'typeorm';
import { Documents } from './documents.entity';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Documents, APP_DB_CONFIG.name)
    private readonly documents: Repository<Documents>,
  ) {}
}
