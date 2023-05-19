import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { Match } from '@/shared/validation-rules/match.validation';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @Length(2, 128)
  @IsNotEmpty()
  @ApiProperty({ example: 'example' })
  username: string;

  @IsEmail()
  @ApiProperty({ example: 'root@example.com' })
  email: string;

  @IsNotEmpty()
  @Length(8, 258)
  @ApiProperty({ example: '123456789' })
  password: string;

  @Match('password')
  @ApiProperty({ example: '123456789' })
  passwordConfirmation: string;
}
