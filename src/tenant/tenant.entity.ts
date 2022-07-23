import { APP_DB_CONFIG } from 'src/config/typeorm';
import { Contact } from 'src/contact/contact.entity';
import { Deal } from 'src/deals/deals.entity';
import { Document } from 'src/documents/documents.entity';
import { Identity } from 'src/identity/identity.entity';
import { Lead } from 'src/leads/leads.entity';
import { Mail } from 'src/mails/mails.entity';
import { Organization } from 'src/organization/organization.entity';
import { Settings } from 'src/settings/settings.entity';
import { Task } from 'src/tasks/tasks.entity';
import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ database: APP_DB_CONFIG.name, schema: 'public', name: 'tenant' })
export class Tenant {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Organization, (organization) => organization.tenant)
  organizations: Organization[];

  @OneToMany(() => Task, (task) => task.tenant)
  tasks: Task[];

  @OneToMany(() => Mail, (task) => task.tenant)
  mails: Mail[];

  @OneToMany(() => Lead, (lead) => lead.tenant)
  leads: Lead[];

  @OneToMany(() => Deal, (deal) => deal.tenant)
  deals: Deal[];

  @OneToMany(() => Contact, (contact) => contact.tenant)
  contacts: Contact[];

  @OneToMany(() => Document, (document) => document.tenant)
  documents: Document[];

  @OneToMany(() => Identity, (identity) => identity.tenant)
  identities: Identity[];

  @OneToMany(() => Settings, (setting) => setting.tenant)
  settings: Settings[];
}
