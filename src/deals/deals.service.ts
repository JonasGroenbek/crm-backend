import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { APP_DB_CONFIG } from 'src/config/typeorm';
import { Repository } from 'typeorm';
import { Deal } from './deals.entity';

@Injectable()
export class DealService {
  constructor(
    @InjectRepository(Deal, APP_DB_CONFIG.name)
    private readonly deals: Repository<Deal>,
  ) {}
}
