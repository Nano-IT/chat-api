import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChatService } from '../chat.service';
import { CreateChatDto } from '../dto/create-chat.dto';
import { UpdateChatDto } from '../dto/update-chat.dto';
import { RequestUser } from '@/shared/decorators/request-user.decorator';
import { User } from '@/user/entities/user.entity';
import { ChatResponseDto } from '@/chat/dto/chat-response.dto';

@Controller('chat')
@ApiTags('chat')
@ApiBearerAuth()
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @ApiResponse({ type: ChatResponseDto })
  create(@Body() createChatDto: CreateChatDto, @RequestUser() user: User) {
    return this.chatService.create(createChatDto, user);
  }

  @Get()
  @ApiResponse({ type: ChatResponseDto, isArray: true })
  findAll(@RequestUser() user: User) {
    return this.chatService.findAll(user.id);
  }

  @Get(':id')
  @ApiResponse({ type: ChatResponseDto })
  findOne(@Param('id') id: string) {
    return this.chatService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({ type: ChatResponseDto })
  update(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto) {
    return this.chatService.update(+id, updateChatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatService.remove(+id);
  }
}
