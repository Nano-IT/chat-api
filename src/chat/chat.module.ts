import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './controllers/chat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { MessageModule } from '@/message/message.module';
import { ChatMessageController } from '@/chat/controllers/chat-message.controller';

@Module({
  controllers: [ChatController, ChatMessageController],
  providers: [ChatService],
  imports: [TypeOrmModule.forFeature([Chat]), MessageModule],
})
export class ChatModule {}
