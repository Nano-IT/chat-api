import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ClsService } from 'nestjs-cls';

@Module({
  controllers: [UserController],
  providers: [UserService, ClsService],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UserService, ClsService],
})
export class UserModule {}
