import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { APP_DB_CONFIG } from 'src/config/typeorm';
import { Repository } from 'typeorm';
import { Tenant } from './tenant.entity';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(Tenant, APP_DB_CONFIG.name)
    private readonly tenantRepository: Repository<Tenant>,
  ) {}

  async getById(id: number) {
    return this.tenantRepository.findOne({ where: { id } });
  }
}
