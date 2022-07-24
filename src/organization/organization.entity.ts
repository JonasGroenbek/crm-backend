import { APP_DB_CONFIG } from 'src/config/typeorm.config';
import { Contact } from 'src/contact/contact.entity';
import { Identity } from 'src/identity/identity.entity';
import { Tenant } from 'src/tenant/tenant.entity';
import { DefaultFields } from 'src/typeorm/entities/default-fields.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  database: APP_DB_CONFIG.name,
  schema: 'public',
  name: 'organization',
})
export class Organization extends DefaultFields {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'phone', type: 'varchar' })
  phone: string;

  @Column({ name: 'email', type: 'varchar' })
  email: string;

  @Column({ name: 'tenant_id', type: 'int' })
  tenantId: number;

  @ManyToOne(() => Tenant, (tenant) => tenant.organizations)
  @JoinColumn({ name: 'tenant_id', referencedColumnName: 'id' })
  tenant: Tenant;

  @OneToMany(() => Contact, (contact) => contact.organization)
  contacts: Contact[];

  @Column({ name: 'organization_id', type: 'int' })
  ownerId: number;

  @ManyToOne(() => Identity, (identity) => identity.organizations)
  @JoinColumn({ name: 'organization_id', referencedColumnName: 'id' })
  owner: Identity;
}
