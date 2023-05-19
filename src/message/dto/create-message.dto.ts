import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty({ example: 'some new message' })
  body: string;
}
