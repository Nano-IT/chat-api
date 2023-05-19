import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
@Injectable()
export class HashService {
  hash(value: string): string {
    const salt = bcrypt.genSaltSync(12);
    return bcrypt.hashSync(value, salt);
  }

  compare(value: string, hash: string): string {
    return bcrypt.compareSync(value, hash);
  }
}
