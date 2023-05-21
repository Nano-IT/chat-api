import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from '../dto/create-message.dto';
import { UpdateMessageDto } from '../dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Message } from '../entities/message.entity';
import { User } from '@/user/entities/user.entity';
import { Chat } from '@/chat/entities/chat.entity';
import { ChatMessageEvents } from '@/message/types/chatMessageEvents';
import { MessageSocketEventsService } from '@/message/services/message-socket-events.service';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,
    private readonly messageSocketEventsService: MessageSocketEventsService,
  ) {}

  async create(payload: CreateMessageDto, chatId, authorId) {
    const author = new User();
    author.id = authorId;
    const chat = new Chat();
    chat.id = chatId;
    const savedMessage = await this.messageRepository.save({
      ...payload,
      chat,
      author,
    });
    const message = await this.findOne(savedMessage.id);
    this.messageSocketEventsService.sendToMembers(
      ChatMessageEvents.NewMessage,
      message,
    );
    return message;
  }

  findAll(chatId: number) {
    return this.messageRepository.find({
      loadRelationIds: {
        relations: ['views'],
      },
      relations: {
        chat: true,
        author: true,
      },
      where: {
        chat: {
          id: chatId,
        },
      },
    });
  }

  findOne(id: number) {
    return this.messageRepository.findOneOrFail({
      where: { id },
      relationLoadStrategy: 'join',
      relations: {
        views: true,
        chat: {
          members: true,
        },
        author: true,
      },
    });
  }

  async viewMessage(id: number, userId: number) {
    const view = new User();
    view.id = userId;

    const currentMessage = await this.findOne(id);

    if (!currentMessage.views.some((item) => item.id === userId)) {
      currentMessage.views.push(view);
    }

    await this.messageRepository.save(currentMessage);
    const message = await this.messageRepository.findOneByOrFail({ id });
    this.messageSocketEventsService.sendToSender(
      ChatMessageEvents.ViewMessage,
      message,
    );
    return message;
  }

  async update(id: number, payload: UpdateMessageDto) {
    await this.messageRepository.update(id, payload);
    const message = await this.findOne(id);

    this.messageSocketEventsService.sendToMembers(
      ChatMessageEvents.UpdateMessage,
      message,
    );
    return message;
  }

  async getUnreadMessages(userId: number) {
    const messages = await this.messageRepository.find({
      relations: { author: true },
      loadRelationIds: {
        relations: ['views'],
      },
      where: [
        {
          author: {
            id: Not(userId),
          },
        },
      ],
    });
    return messages.filter(({ views }: any) => !views.includes(userId));
  }

  async remove(id: number) {
    const message = await this.messageRepository.findOneByOrFail({ id });

    this.messageSocketEventsService.sendToMembers(
      ChatMessageEvents.DeleteMessage,
      message,
    );
    return await this.messageRepository.remove(message);
  }
}
