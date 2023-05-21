import { Injectable } from '@nestjs/common';
import { Chat } from '../entities/chat.entity';
import { SocketGateway } from '@/shared/gateways/socket.gateway';
import { ChatEvents } from '@/chat/types/chatEvents';

@Injectable()
export class ChatSocketService {
  constructor(private socket: SocketGateway) {}

  emitChatEvent(event: ChatEvents, payload: Chat) {
    const members = payload.members.map(({ id }) => String(id));
    this.socket.server.to(members).emit(event, payload);
  }
}
