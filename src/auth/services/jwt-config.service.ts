import { Injectable } from '@nestjs/common';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  constructor(private configService: ConfigService) {}
  createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.configService.getOrThrow('JWT_SECRET'),
      global: true,
      signOptions: {
        expiresIn: this.configService.getOrThrow('JWT_EXPIRES'),
      },
    };
  }
}
