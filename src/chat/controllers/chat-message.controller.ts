import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChatService } from '../services/chat.service';
import { MessageService } from '@/message/services/message.service';
import { CreateMessageDto } from '@/message/dto/create-message.dto';
import { RequestUser } from '@/shared/decorators/request-user.decorator';
import { User } from '@/user/entities/user.entity';
import { ChatMessageResponseDto } from '@/chat/dto/chat-message-response.dto';
import { UpdateMessageDto } from '@/message/dto/update-message.dto';

@Controller('chat/:chatId/messages')
@ApiTags('chat-message')
@ApiBearerAuth()
export class ChatMessageController {
  constructor(
    private readonly chatService: ChatService,
    private readonly messagesService: MessageService,
  ) {}

  @Post()
  @ApiResponse({ type: ChatMessageResponseDto })
  create(
    @Body() createChatDto: CreateMessageDto,
    @Param('chatId') chatId: string,
    @RequestUser() user: User,
  ) {
    return this.messagesService.create(createChatDto, chatId, user.id);
  }

  @Get()
  @ApiResponse({ type: ChatMessageResponseDto, isArray: true })
  getChatMessages(@Param('chatId') chatId: string) {
    return this.messagesService.findAll(Number(chatId));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messagesService.remove(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messagesService.update(+id, updateMessageDto);
  }
}
