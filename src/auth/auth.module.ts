import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '@/user/user.module';
import { HashService } from '@/shared/services/hash.service';
import { JwtModule, JwtService as BaseJwtService } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtConfigService } from '@/auth/services/jwt-config.service';
import { JwtService } from '@/auth/services/jwt.service';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    HashService,
    JwtService,
    BaseJwtService,
    JwtStrategy,
    ConfigService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: JwtConfigService,
    }),
  ],
  exports: [JwtService, BaseJwtService, AuthService],
})
export class AuthModule {}
