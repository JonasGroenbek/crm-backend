import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class DefaultFields extends BaseEntity {
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  created: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updated: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deleted: Date;
}
