import { Module } from '@nestjs/common';
import { ChatService } from './services/chat.service';
import { ChatController } from './controllers/chat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { MessageModule } from '@/message/message.module';
import { ChatMessageController } from '@/chat/controllers/chat-message.controller';
import { ChatMembersController } from '@/chat/controllers/chat-members.controller';
import { ChatMemberService } from '@/chat/services/chat-member.service';
import { ChatSocketService } from '@/chat/services/chat-socket.service';

@Module({
  controllers: [ChatController, ChatMessageController, ChatMembersController],
  providers: [ChatService, ChatMemberService, ChatSocketService],
  imports: [TypeOrmModule.forFeature([Chat]), MessageModule],
})
export class ChatModule {}
