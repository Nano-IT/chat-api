import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Exclude()
  @CreateDateColumn()
  createdAt: string;

  @Exclude()
  @UpdateDateColumn()
  updatedAt: string;
}
