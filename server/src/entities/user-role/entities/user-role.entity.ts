import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from '@entities/user/entities/user.entity';

@Entity()
export class UserRole {
  @PrimaryGeneratedColumn({ name: 'role_id' })
  id: number;

  @Column()
  name: string;

  @Column()
  get: boolean;

  // @ManyToOne(() => User, (users) => users.role, { nullable: true })
  // @JoinColumn({ name: 'user_id' })
  // user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
