import { IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateChatDto {
  @IsNotEmpty()
  @Length(2, 128)
  @ApiProperty({ example: 'Chat name' })
  name: string;
}
