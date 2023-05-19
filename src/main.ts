import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ValidationExceptionFilter } from './shared/filters/validation.filter';
import { ValidationException } from './shared/exceptions/validation.exception';
import { GlobalExceptionFilter } from '@/shared/filters/global-error-handler.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API example')
    .setDescription('The API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.useGlobalFilters(
    new GlobalExceptionFilter(),
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
  await app.listen(3000);
}
bootstrap();
