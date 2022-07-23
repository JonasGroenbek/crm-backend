import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_DB_CONFIG } from 'src/config/typeorm';
import { MailController } from './mails.controller';
import { Mail } from './mails.entity';
import { MailService } from './mails.service';

@Module({
  imports: [TypeOrmModule.forFeature([Mail], APP_DB_CONFIG.name)],
  controllers: [MailController],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
