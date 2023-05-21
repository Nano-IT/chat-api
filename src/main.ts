import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ValidationExceptionFilter } from './shared/filters/validation.filter';
import { ValidationException } from './shared/exceptions/validation.exception';
import { GlobalExceptionFilter } from '@/shared/filters/global-error-handler.filter';
import { HttpExceptionFilter } from '@/shared/filters/http-exception.filter';
import { ChatEvents } from '@/chat/types/chatEvents';
import { ChatMessageEvents } from '@/message/types/chatMessageEvents';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.useGlobalFilters(
    new GlobalExceptionFilter(),
    new HttpExceptionFilter(),
    new ValidationExceptionFilter(),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => new ValidationException(errors),
    }),
  );
  app.enableCors({
    origin: '*',
  });

  const socketEvents = [
    ...Object.values(ChatEvents),
    ...Object.values(ChatMessageEvents),
  ].join(', ');

  const config = new DocumentBuilder()
    .setTitle('Chat API')
    .setDescription(
      `Chat uses <a target="_blank" href="https://socket.io/">Socket.IO</a>. For handling connections emit join event and pass userId as payload.<br>
        Example: 
        <pre>import { io } from "socket.io-client";<br>
        const socket = io("ws://example.com/my-namespace");
        socket.emit("join", 2); // where 2 is current user id</pre>
      <br> 
      <br> 
      <h2>Socket events: </h2>
      <pre>${socketEvents}</pre> `,
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  await app.listen(3000);
}
bootstrap();
