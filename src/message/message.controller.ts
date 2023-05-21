import { Controller, Get, Post, Param } from '@nestjs/common';
import { MessageService } from './services/message.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RequestUser } from '@/shared/decorators/request-user.decorator';
import { User } from '@/user/entities/user.entity';

@Controller('messages')
@ApiTags('message')
@ApiBearerAuth()
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get('unread-count')
  getUnreadMessages(@RequestUser() user: User) {
    return this.messageService.getUnreadMessages(user.id);
  }

  @Post(':id/view')
  viewMessage(@Param('id') id: string, @RequestUser() { id: userid }: User) {
    return this.messageService.viewMessage(+id, userid);
  }
}
