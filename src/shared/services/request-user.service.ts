import { Injectable } from '@nestjs/common';
import { User } from '@/user/entities/user.entity';

@Injectable()
export class RequestUserService {
  user: User;

  setUser(user: User) {
    this.user = user;
  }
}
