import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { APP_DB_CONFIG } from 'src/config/typeorm';
import { Repository } from 'typeorm';
import { Deals } from './deals.entity';

@Injectable()
export class DealsService {
  constructor(
    @InjectRepository(Deals, APP_DB_CONFIG.name)
    private readonly deals: Repository<Deals>,
  ) {}
}
