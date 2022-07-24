import { APP_DB_CONFIG } from 'src/config/typeorm.config';
import { Contact } from 'src/contact/contact.entity';
import { Deal } from 'src/deals/deals.entity';
import { Document } from 'src/documents/documents.entity';
import { Identity } from 'src/identity/identity.entity';
import { Lead } from 'src/leads/leads.entity';
import { Mail } from 'src/mails/mails.entity';
import { Organization } from 'src/organization/organization.entity';
import { Settings } from 'src/settings/settings.entity';
import { Task } from 'src/tasks/tasks.entity';
import { DefaultFields } from 'src/typeorm/entities/default-fields.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

enum SubscriptionStatus {
  Active = 'Active',
  Past_due = 'PastDue',
  Unpaid = 'Unpaid',
  Canceled = 'Cancelled',
  Incomplete = 'Incomplete',
  Incomplete_expired = 'IncompleteExpired',
  Trialing = 'Trialing',
  All = 'All',
  Ended = 'Ended',
}

@Entity({ database: APP_DB_CONFIG.name, schema: 'public', name: 'tenant' })
export class Tenant extends DefaultFields {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', name: 'customer_id', nullable: true })
  customerId: string;

  @Column({ type: 'int', name: 'subscription_id', nullable: true })
  subscriptionId: number;

  @Column({
    name: 'sbuscription_status',
    type: 'enum',
    enum: SubscriptionStatus,
    nullable: true,
  })
  subscriptionStatus: SubscriptionStatus;

  @OneToMany(() => Organization, (organization) => organization.tenant)
  organizations: Organization[];

  @Column({ type: 'date', name: 'trial_period_end', nullable: true })
  trialPeriodEnd: Date;

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
