import { APP_DB_CONFIG } from 'src/config/typeorm';
import { Identity } from 'src/identity/identity.entity';
import { Organization } from 'src/organization/organization.entity';
import { Tenant } from 'src/tenant/tenant.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

enum ContactType {}

@Entity({ database: APP_DB_CONFIG.name, schema: 'public', name: 'contact' })
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'phone', type: 'varchar' })
  phone: string;

  @Column({ name: 'type', type: 'enum', enum: ContactType })
  type: ConnectionType;

  @Column({ name: 'tenant_id', type: 'int' })
  tenantId: number;

  @ManyToOne(() => Tenant, (tenant) => tenant.contacts)
  @JoinColumn({ name: 'tenant_id', referencedColumnName: 'id' })
  tenant: Tenant;

  @Column({ name: 'organization_id', type: 'int' })
  organizationId: number;

  @ManyToOne(() => Organization, (organization) => organization.contacts)
  @JoinColumn({ name: 'organization_id', referencedColumnName: 'id' })
  organization: Organization;

  @Column({ name: 'email', type: 'varchar' })
  email: string;

  @Column({ name: 'owner_id', type: 'int' })
  ownerId: number;

  @ManyToOne(() => Identity, (identity) => identity.contacts)
  @JoinColumn({ name: 'owner_id', referencedColumnName: 'id' })
  owner: Identity;
}
