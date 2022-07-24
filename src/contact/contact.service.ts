import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { APP_DB_CONFIG } from 'src/config/typeorm.config';
import { Repository } from 'typeorm';
import { Contact } from './contact.entity';
import { GetManyContactsDto } from './dto/get-many.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact, APP_DB_CONFIG.name)
    private readonly contactRepository: Repository<Contact>,
  ) {}

  async getMany({
    limit = 50,
    offset = 0,
  }: GetManyContactsDto): Promise<{ count: number; contacts: Contact[] }> {
    const query = this.contactRepository.createQueryBuilder('contact');

    query.skip(offset);
    query.take(limit);

    const [contacts, count] = await query.getManyAndCount();

    return {
      count: count,
      contacts,
    };
  }
}
