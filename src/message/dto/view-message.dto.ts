import { ApiProperty } from '@nestjs/swagger';

export class ViewMessageDto {
  @ApiProperty()
  userId: number;
}
