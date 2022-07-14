import { TSC_CONFIG } from 'src/config/typeorm';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity(TSC_CONFIG.name)
export class Tsc {
  @PrimaryGeneratedColumn()
  id: number;
}
