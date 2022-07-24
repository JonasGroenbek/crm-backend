import { TSC_DB_CONFIG } from 'src/config/typeorm.config';
import { DefaultFields } from 'src/typeorm/entities/default-fields.entity';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity(TSC_DB_CONFIG.name)
export class Tsc extends DefaultFields {
  @PrimaryGeneratedColumn()
  id: number;
}
