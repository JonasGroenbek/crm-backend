import { TSC_DB_CONFIG } from 'src/config/typeorm';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity(TSC_DB_CONFIG.name)
export class Tsc {
  @PrimaryGeneratedColumn()
  id: number;
}
