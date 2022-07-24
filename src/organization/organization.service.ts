import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { APP_DB_CONFIG } from 'src/config/typeorm.config';
import { Repository } from 'typeorm';
import { GetManyOrganizationsDto } from './dto/get-many.dto';
import { Organization } from './organization.entity';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization, APP_DB_CONFIG.name)
    private readonly organizationRepository: Repository<Organization>,
  ) {}

  async getById(id: number) {
    return this.organizationRepository.findOne({ where: { id } });
  }

  async getMany({ limit = 50, offset = 0 }: GetManyOrganizationsDto): Promise<{
    count: number;
    organizations: Organization[];
  }> {
    const query =
      this.organizationRepository.createQueryBuilder('organization');

    query.skip(offset);
    query.take(limit);

    const [organizations, count] = await query.getManyAndCount();

    return {
      count: count,
      organizations,
    };
  }
}
