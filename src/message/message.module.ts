import { Module } from '@nestjs/common';
import { MessageService } from './services/message.service';
import { MessageController } from './message.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { MessageSocketEventsService } from '@/message/services/message-socket-events.service';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  controllers: [MessageController],
  providers: [MessageService, MessageSocketEventsService],
  exports: [MessageService],
})
export class MessageModule {}
