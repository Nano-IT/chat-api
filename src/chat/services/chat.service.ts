import { Injectable } from '@nestjs/common';
import { CreateChatDto } from '../dto/create-chat.dto';
import { UpdateChatDto } from '../dto/update-chat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from '../entities/chat.entity';
import { Repository } from 'typeorm';
import { User } from '@/user/entities/user.entity';
import { ChatSocketService } from '@/chat/services/chat-socket.service';
import { ChatEvents } from '@/chat/types/chatEvents';

@Injectable()
export class ChatService {
  constructor(
    private chatSocketService: ChatSocketService,
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,
  ) {}
  async create(createChatDto: CreateChatDto, user: User) {
    const chat = await this.chatRepository.create(createChatDto);
    chat.members = [user];
    const savedChat = await this.chatRepository.save(chat);
    this.chatSocketService.emitChatEvent(ChatEvents.NewChat, savedChat);

    return savedChat;
  }

  async findAll(memberId: number) {
    return await this.chatRepository.find({
      where: {
        members: {
          id: memberId,
        },
      },
      relations: {
        members: true,
        messages: true,
      },
    });
  }

  findOne(id: number) {
    return this.chatRepository.findOneOrFail({
      where: { id },
      relations: { members: true },
    });
  }

  async update(id: number, updateChatDto: UpdateChatDto) {
    await this.chatRepository.update(id, updateChatDto);
    const chat = await this.findOne(id);

    this.chatSocketService.emitChatEvent(ChatEvents.UpdateChat, chat);
    return chat;
  }

  async remove(id: number) {
    const chat = await this.findOne(id);
    await this.chatRepository.remove(chat);
    this.chatSocketService.emitChatEvent(ChatEvents.DeleteChat, chat);
    return true;
  }
}
