import { APP_DB_CONFIG } from 'src/config/typeorm.config';
import { Tenant } from 'src/tenant/tenant.entity';
import { DefaultFields } from 'src/typeorm/entities/default-fields.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ database: APP_DB_CONFIG.name, schema: 'public', name: 'setting' })
export class Settings extends DefaultFields {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'tenant_id', type: 'int' })
  tenantId: number;

  @ManyToOne(() => Tenant, (tenant) => tenant.settings)
  @JoinColumn({ name: 'tenant_id', referencedColumnName: 'id' })
  tenant: Tenant;
}
