import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { APP_DB_CONFIG } from 'src/config/typeorm.config';
import { Repository } from 'typeorm';
import { Document } from './documents.entity';
import { GetManyDocumentDto } from './dto/get-many.dto';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document, APP_DB_CONFIG.name)
    private readonly documentsRepository: Repository<Document>,
  ) {}

  async getMany({
    limit = 50,
    offset = 0,
  }: GetManyDocumentDto): Promise<{ count: number; documents: Document[] }> {
    const query = this.documentsRepository.createQueryBuilder('lead');

    query.skip(offset);
    query.take(limit);

    const [documents, count] = await query.getManyAndCount();

    return {
      count: count,
      documents,
    };
  }
}
