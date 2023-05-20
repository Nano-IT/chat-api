import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { GlobalResponseError } from './globa.response.error';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const message = exception.message;
    const code = exception.name;

    Logger.error(message, exception.stack, `${request.method} ${request.url}`);

    const status = exception.getStatus();

    response
      .status(status)
      .json(GlobalResponseError(status, message, code, request));
  }
}
