import { Injectable } from '@nestjs/common';
import { JwtService as SharedJwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class JwtService {
  constructor(
    private jwtService: SharedJwtService,
    private configService: ConfigService,
  ) {}

  signAsync(payload) {
    return this.jwtService.signAsync(payload, {
      secret: this.configService.getOrThrow('JWT_SECRET'),
    });
  }

  verifyAsync(token: string) {
    return this.jwtService.verifyAsync(token.replace('Bearer', '').trim(), {
      secret: this.configService.getOrThrow('JWT_SECRET'),
    });
  }

  verify(token: string) {
    return this.jwtService.verify(token.replace('Bearer', '').trim(), {
      secret: this.configService.getOrThrow('JWT_SECRET'),
    });
  }
}
