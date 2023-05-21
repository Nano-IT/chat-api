import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddMemberDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 1 })
  memberId: number;
}
