import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { APP_DB_CONFIG } from 'src/config/typeorm.config';
import { Repository } from 'typeorm';
import { Deal } from './deals.entity';
import { GetManyDealDto } from './dto/get-many.dto';

@Injectable()
export class DealService {
  constructor(
    @InjectRepository(Deal, APP_DB_CONFIG.name)
    private readonly dealRepository: Repository<Deal>,
  ) {}

  async getMany({
    limit = 50,
    offset = 0,
  }: GetManyDealDto): Promise<{ count: number; deals: Deal[] }> {
    const query = this.dealRepository.createQueryBuilder('lead');

    query.skip(offset);
    query.take(limit);

    const [deals, count] = await query.getManyAndCount();

    return {
      count: count,
      deals,
    };
  }
}
