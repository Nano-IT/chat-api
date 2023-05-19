import {
  Controller,
  Post,
  Body,
  SerializeOptions,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { PublicDecorator } from '@/shared/decorators/public.decorator';
import { GROUP_USER_PROFILE } from '@/user/consts';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CredentialsResponseDto } from '@/auth/dto/credentials-response.dto';

@Controller('auth')
@ApiTags('auth')
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @PublicDecorator()
  @Post('register')
  @SerializeOptions({
    groups: [GROUP_USER_PROFILE],
  })
  @ApiResponse({ type: CredentialsResponseDto })
  register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @PublicDecorator()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @SerializeOptions({
    groups: [GROUP_USER_PROFILE],
  })
  @ApiResponse({ type: CredentialsResponseDto })
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }
}
