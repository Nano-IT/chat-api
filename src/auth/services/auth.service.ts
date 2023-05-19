import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { UserService } from '@/user/user.service';
import { HashService } from '@/shared/services/hash.service';
import { JwtService } from '@/auth/services/jwt.service';
import { User } from '@/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private hashService: HashService,
    private jwtService: JwtService,
  ) {}

  async register(payload: RegisterDto) {
    const { passwordConfirmation, password: rawPassword, ...data } = payload;

    if (passwordConfirmation !== rawPassword) {
      throw new UnprocessableEntityException('Password mismatch');
    }

    const password = this.hashService.hash(payload.password);
    const saved = await this.userService.save({
      ...data,
      password,
    });

    const token = await this.jwtService.signAsync(payload);
    const user = new User();
    Object.assign(user, { ...saved, token });
    return user;
  }

  async login(payload: LoginDto) {
    const response = await this.userService.findOneBy({
      email: payload.email,
    });

    if (!response) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    const { password, ...user } = response;

    this.checkPassword(payload.password, password);
    const authUser = new User();

    Object.assign(authUser, {
      ...user,
      token: await this.jwtService.signAsync({ id: user.id }),
    });
    return authUser;
  }

  checkPassword(password, hash) {
    const matches = this.hashService.compare(password, hash);

    if (!matches) {
      throw new UnprocessableEntityException('Invalid email or password');
    }
  }
}
