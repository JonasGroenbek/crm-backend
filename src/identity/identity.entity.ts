import { TSC_CONFIG } from 'src/config/typeorm';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity(TSC_CONFIG.name)
export class Identity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'email', type: 'varchar' })
  email: string;

  @Column({ name: 'password', type: 'varchar' })
  password: string;
}
