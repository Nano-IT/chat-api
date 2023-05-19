import { ApiProperty } from '@nestjs/swagger';
import { ChatResponseDto } from '@/chat/dto/chat-response.dto';

export class ChatMessageResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Chat name' })
  body: string;

  @ApiProperty({ example: new Date().toISOString() })
  createdAt: string;

  @ApiProperty({ example: new Date().toISOString() })
  updatedAt: string;

  @ApiProperty({ example: ChatResponseDto })
  chat: ChatResponseDto;
}
