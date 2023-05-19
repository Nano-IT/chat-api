import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { Repository } from 'typeorm';
import { User } from '@/user/entities/user.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,
  ) {}
  async create(createChatDto: CreateChatDto, user: User) {
    const chat = await this.chatRepository.create(createChatDto);
    chat.members = [user];
    return await this.chatRepository.save(chat);
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
    return this.chatRepository.findOneByOrFail({ id });
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return this.chatRepository.update(id, updateChatDto);
  }

  async remove(id: number) {
    const chat = await this.chatRepository.findOneByOrFail({ id });
    return await this.chatRepository.remove(chat);
  }
}
