import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_DB_CONFIG } from 'src/config/typeorm.config';
import { ContactController } from './contact.controller';
import { Contact } from './contact.entity';
import { ContactService } from './contact.service';

@Module({
  imports: [TypeOrmModule.forFeature([Contact], APP_DB_CONFIG.name)],
  controllers: [ContactController],
  providers: [ContactService],
  exports: [ContactService],
})
export class ContactModule {}
