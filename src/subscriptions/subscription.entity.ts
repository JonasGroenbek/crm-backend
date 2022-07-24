import { APP_DB_CONFIG } from 'src/config/typeorm.config';
import { Tenant } from 'src/tenant/tenant.entity';
import { DefaultFields } from 'src/typeorm/entities/default-fields.entity';
import { Column, Entity, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';

enum Status {
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

@Entity({
  database: APP_DB_CONFIG.name,
  schema: 'public',
  name: 'subscription',
})
export class Subscription extends DefaultFields {
  @PrimaryGeneratedColumn()
  id: number;
}
