import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { APP_DB_CONFIG } from 'src/config/typeorm.config';
import { Repository } from 'typeorm';
import { Mail } from './mails.entity';

@Injectable()
export class MailService {
  constructor(
    @InjectRepository(Mail, APP_DB_CONFIG.name)
    private readonly leads: Repository<Mail>,
  ) {}
}
