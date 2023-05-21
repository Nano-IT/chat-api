import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from '../entities/chat.entity';
import { Repository } from 'typeorm';
import { User } from '@/user/entities/user.entity';
import { ChatSocketService } from '@/chat/services/chat-socket.service';
import { ChatEvents } from '@/chat/types/chatEvents';

@Injectable()
export class ChatMemberService {
  constructor(
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,
    private chatSocketService: ChatSocketService,
  ) {}

  async addMember(chatId, memberId) {
    const chat = await this.chatRepository.findOneOrFail({
      where: { id: chatId },
      relations: {
        members: true,
      },
    });

    if (chat.members.some((item) => item.id === memberId)) {
      throw new BadRequestException('User already exists');
    }

    const member = new User();
    member.id = memberId;
    chat.members.push(member);
    const savedChat = await this.chatRepository.save(chat);
    this.chatSocketService.emitChatEvent(ChatEvents.NewMember, savedChat);
    return savedChat;
  }

  async removeMember(chatId, memberId) {
    const chat = await this.chatRepository.findOneOrFail({
      where: { id: chatId },
      relations: {
        members: true,
      },
    });

    if (!chat.members.some((item) => item.id === memberId)) {
      throw new BadRequestException('User not a member on this chat!');
    }
    const index = chat.members.findIndex((item) => item.id === memberId);
    chat.members.splice(index, 1);

    this.chatSocketService.emitChatEvent(ChatEvents.RemoveMember, chat);
    return await this.chatRepository.save(chat);
  }
}
