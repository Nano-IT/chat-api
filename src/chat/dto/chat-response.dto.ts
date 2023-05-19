import { ApiProperty } from '@nestjs/swagger';

export class ChatResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Chat name' })
  name: string;
}
