import { APP_DB_CONFIG } from 'src/config/typeorm';
import { Identity } from 'src/identity/identity.entity';
import { Tenant } from 'src/tenant/tenant.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ database: APP_DB_CONFIG.name, schema: 'public', name: 'document' })
export class Document {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'tenant_id', type: 'int' })
  tenantId: number;

  @ManyToOne(() => Tenant, (tenant) => tenant.documents)
  @JoinColumn({ name: 'tenant_id', referencedColumnName: 'id' })
  tenant: Tenant;

  @Column({ name: 'organization_id', type: 'int' })
  ownerId: number;

  @ManyToOne(() => Identity, (identity) => identity.documents)
  @JoinColumn({ name: 'organization_id', referencedColumnName: 'id' })
  owner: Identity;
}
