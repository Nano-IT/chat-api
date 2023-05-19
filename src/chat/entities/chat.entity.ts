import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '@/user/entities/user.entity';
import { Exclude, Expose } from 'class-transformer';
import { Message } from '@/message/entities/message.entity';
const GROUP_USER = 'users';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column()
  name: string;

  @Exclude()
  @CreateDateColumn()
  createdAt: string;

  @Exclude()
  @UpdateDateColumn()
  updatedAt: string;

  @Expose({ groups: [GROUP_USER] })
  @ManyToMany(() => User)
  @JoinTable({
    name: 'chat_member',
    inverseJoinColumn: {
      referencedColumnName: 'id',
      name: 'memberId',
    },
  })
  members: User[];

  @OneToMany(() => Message, (msg) => msg.chat)
  messages?: Message[];
}
