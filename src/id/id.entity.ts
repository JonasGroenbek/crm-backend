import { TSC_CONFIG, TSC_DB_CONFIG } from 'src/config/typeorm';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity(TSC_CONFIG.name)
export class Id {
  @PrimaryGeneratedColumn()
  id: number;
}
