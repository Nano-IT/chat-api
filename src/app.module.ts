import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MessageModule } from './message/message.module';
import { ChatModule } from './chat/chat.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from '@/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeormConfigService } from '@/shared/services/typeorm-config.service';
import { RequestUserMiddleware } from '@/shared/middleware/request-user.middleware';
import { RequestUserService } from '@/shared/services/request-user.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useClass: TypeormConfigService,
    }),
    AuthModule,
    MessageModule,
    ChatModule,
    UserModule,
  ],
  providers: [RequestUserService],
  exports: [RequestUserService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestUserMiddleware).forRoutes('*');
  }
}
