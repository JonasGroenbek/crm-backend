import { APP_DB_CONFIG } from 'src/config/typeorm.config';
import { Contact } from 'src/contact/contact.entity';
import { Deal } from 'src/deals/deals.entity';
import { Document } from 'src/documents/documents.entity';
import { Lead } from 'src/leads/leads.entity';
import { Mail } from 'src/mails/mails.entity';
import { Organization } from 'src/organization/organization.entity';
import { Task } from 'src/tasks/tasks.entity';
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

export enum Role {
  Admin = 'Admin',
  Sales = 'Sales',
}

@Entity({ database: APP_DB_CONFIG.name, schema: 'public', name: 'identity' })
export class Identity extends DefaultFields {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'role',
    type: 'enum',
    enum: Role,
    nullable: false,
    default: Role.Sales,
  })
  role: Role;

  @Column({ name: 'email', type: 'varchar' })
  email: string;

  @Column({ name: 'password', type: 'varchar' })
  password: string;

  @Column({ name: 'tenant_id', type: 'int', nullable: false })
  tenantId: number;

  @ManyToOne(() => Tenant, (tenant) => tenant.identities)
  @JoinColumn({ name: 'tenant_id', referencedColumnName: 'id' })
  tenant: Tenant;

  @OneToMany(() => Organization, (organization) => organization.owner)
  organizations: Organization[];

  @OneToMany(() => Task, (task) => task.owner)
  tasks: Task[];

  @OneToMany(() => Mail, (task) => task.owner)
  mails: Mail[];

  @OneToMany(() => Lead, (lead) => lead.owner)
  leads: Lead[];

  @OneToMany(() => Deal, (deal) => deal.owner)
  deals: Deal[];

  @OneToMany(() => Contact, (contact) => contact.owner)
  contacts: Contact[];

  @OneToMany(() => Document, (document) => document.owner)
  documents: Document[];
}
