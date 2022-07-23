import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { APP_DB_CONFIG } from 'src/config/typeorm';
import { Repository } from 'typeorm';
import { GetManyLeadDTO } from './dto/get-many.dto';
import { Lead } from './leads.entity';

@Injectable()
export class LeadService {
  constructor(
    @InjectRepository(Lead, APP_DB_CONFIG.name)
    private readonly leadRepository: Repository<Lead>,
  ) {}

  async getMany({
    limit = 50,
    offset = 0,
  }: GetManyLeadDTO): Promise<{ count: number; leads: Lead[] }> {
    const query = this.leadRepository.createQueryBuilder('lead');

    query.skip(offset);
    query.take(limit);

    const [leads, count] = await query.getManyAndCount();

    return {
      count: count,
      leads: leads,
    };
  }
}
