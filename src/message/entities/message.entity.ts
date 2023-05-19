import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '@/user/entities/user.entity';
import { Chat } from '@/chat/entities/chat.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column()
  body: string;

  @ManyToOne(() => User)
  author: User;

  @ManyToOne(() => Chat, (chat) => chat.messages)
  chat: Chat;

  @ManyToMany(() => User)
  @JoinTable({
    name: 'message_view',
    inverseJoinColumn: {
      referencedColumnName: 'id',
      name: 'userId',
    },
  })
  views: User[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
