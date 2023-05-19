import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { RequestUserService } from '@/shared/services/request-user.service';
import { JwtService } from '@/auth/services/jwt.service';

@Injectable()
export class RequestUserMiddleware implements NestMiddleware {
  constructor(
    private requestUserService: RequestUserService,
    private jwtService: JwtService,
  ) {}
  use(req: any, res: Response, next: NextFunction) {
    if (req.header('authorization')) {
      this.requestUserService.setUser(
        this.jwtService.verify(req.header('authorization')),
      );
    }
    next();
  }
}
