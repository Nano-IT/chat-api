import { Injectable } from '@nestjs/common';
import { SocketGateway } from '@/shared/gateways/socket.gateway';
import { ChatMessageEvents } from '@/message/types/chatMessageEvents';
import { Message } from '@/message/entities/message.entity';

@Injectable()
export class MessageSocketEventsService {
  constructor(private readonly socket: SocketGateway) {}

  sendToMembers(event: ChatMessageEvents, payload: Message) {
    const members = payload.chat.members.map(({ id }) => String(id));
    this.socket.server.to(members).emit(event, payload);
  }

  sendToSender(event: ChatMessageEvents, payload: Message) {
    const sender = String(payload.author.id);
    this.socket.server.to(sender).emit(event, payload);
  }
}
