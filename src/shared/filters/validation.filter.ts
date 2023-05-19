import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ValidationException } from '@/shared/exceptions/validation.exception';

@Catch(ValidationException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch({ errors, message }: ValidationException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({ message, errors });
  }
}
