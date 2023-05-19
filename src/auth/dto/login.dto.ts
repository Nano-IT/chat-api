import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'root@example.com' })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ example: '123456789' })
  password: string;
}
