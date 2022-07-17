import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { APP_DB_CONFIG } from 'src/config/typeorm';
import { Repository } from 'typeorm';
import { Connections } from './connections.entity';

@Injectable()
export class ConnectionsService {
  constructor(
    @InjectRepository(Connections, APP_DB_CONFIG.name)
    private readonly deals: Repository<Connections>,
  ) {}
}
