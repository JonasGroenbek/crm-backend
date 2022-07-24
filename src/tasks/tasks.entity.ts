import { APP_DB_CONFIG } from 'src/config/typeorm.config';
import { Identity } from 'src/identity/identity.entity';
import { Tenant } from 'src/tenant/tenant.entity';
import { DefaultFields } from 'src/typeorm/entities/default-fields.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ database: APP_DB_CONFIG.name, schema: 'public', name: 'task' })
export class Task extends DefaultFields {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'tenant_id', type: 'int' })
  tenantId: number;

  @ManyToOne(() => Tenant, (tenant) => tenant.tasks)
  @JoinColumn({ name: 'tenant_id', referencedColumnName: 'id' })
  tenant: Tenant;

  @Column({ name: 'organization_id', type: 'int' })
  ownerId: number;

  @ManyToOne(() => Identity, (identity) => identity.tasks)
  @JoinColumn({ name: 'organization_id', referencedColumnName: 'id' })
  owner: Identity;
}
