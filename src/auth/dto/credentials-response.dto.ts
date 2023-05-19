import { ApiProperty } from '@nestjs/swagger';

export class CredentialsResponseDto {
  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiProperty({ example: 'user' })
  username: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZG9tYWluLmNvbSIsInN1YiI6MzcsInJvbGVzIjpbInVzZXIiXSwiaWF0IjoxNjg0NTExMjU0LCJleHAiOjE2ODQ1MTQ4NTR9.kHLwKKzr81UTzjhI0oufPrkAK9dvgZ_yjRYjV_JMq_o',
  })
  token: string;

  @ApiProperty({ example: 1 })
  id: number;
}
