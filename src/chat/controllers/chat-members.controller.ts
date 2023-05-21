import { Controller, Post, Body, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChatMessageResponseDto } from '@/chat/dto/chat-message-response.dto';
import { ChatMemberService } from '@/chat/services/chat-member.service';
import { AddMemberDto } from '@/chat/dto/add-member.dto';

@Controller('chat/:chatId/members')
@ApiTags('chat-members')
@ApiBearerAuth()
export class ChatMembersController {
  constructor(private readonly chatMemberService: ChatMemberService) {}

  @Post()
  @ApiResponse({ type: ChatMessageResponseDto })
  addMember(
    @Body() { memberId }: AddMemberDto,
    @Param('chatId') chatId: string,
  ) {
    return this.chatMemberService.addMember(chatId, memberId);
  }

  @Delete()
  remove(@Param('chatId') chatId: string, @Body() { memberId }: AddMemberDto) {
    return this.chatMemberService.removeMember(Number(chatId), memberId);
  }
}
