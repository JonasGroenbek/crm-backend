import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { APP_DB_CONFIG } from 'src/config/typeorm';
import { Repository } from 'typeorm';
import { Mails } from './mails.entity';

@Injectable()
export class MailsService {
  constructor(
    @InjectRepository(Mails, APP_DB_CONFIG.name)
    private readonly leads: Repository<Mails>,
  ) {}
}
