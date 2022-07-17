import { APP_DB_CONFIG } from 'src/config/typeorm';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity(APP_DB_CONFIG.name)
export class Mails {
  @PrimaryGeneratedColumn()
  id: number;
}
