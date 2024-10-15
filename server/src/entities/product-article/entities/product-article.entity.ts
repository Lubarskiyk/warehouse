import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ProductArticle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  articleNumber: number;

  @Column()
  articleName: string;

  @Column({ default: 0 })
  countOne: number;

  @Column('real', { default: 0 })
  normOne: number;

  @Column({ default: 0 })
  countTwo: number;

  @Column('real', { default: 0 })
  normTwo: number;

  @Column({ default: 0 })
  countThree: number;

  @Column('real', { default: 0 })
  normThree: number;

  @Column({ default: 0 })
  countFour: number;

  @Column('real', { default: 0 })
  normFour: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
