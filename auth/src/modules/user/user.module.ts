import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserController } from './user.controller'
import { UserService } from './user.service'
import { User } from '../../models/user.model'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
    ])
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
