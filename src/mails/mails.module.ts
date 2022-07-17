import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_DB_CONFIG } from 'src/config/typeorm';
import { MailsController } from './mails.controller';
import { Mails } from './mails.entity';
import { MailsService } from './mails.service';

@Module({
  imports: [TypeOrmModule.forFeature([Mails], APP_DB_CONFIG.name)],
  controllers: [MailsController],
  providers: [MailsService],
  exports: [MailsService],
})
export class MailsModule {}
