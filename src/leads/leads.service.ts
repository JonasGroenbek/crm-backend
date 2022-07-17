import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { APP_DB_CONFIG } from 'src/config/typeorm';
import { Repository } from 'typeorm';
import { Leads } from './leads.entity';

@Injectable()
export class LeadsService {
  constructor(
    @InjectRepository(Leads, APP_DB_CONFIG.name)
    private readonly leads: Repository<Leads>,
  ) {}
}
