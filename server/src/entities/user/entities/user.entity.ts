import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { UserRole } from '@entities/user-role/entities/user-role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 20 })
  nameFirst: string;

  @Column({ type: 'varchar', length: 20 })
  nameLast: string;

  @Column({ type: 'varchar', length: 20 })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @OneToOne(() => UserRole, (role) => role.user, { nullable: true })
  @JoinColumn({ name: 'role_id' })
  role: UserRole;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
