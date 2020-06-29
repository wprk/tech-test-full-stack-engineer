import { classToClass } from 'class-transformer'
import { Injectable } from '@nestjs/common';

import { UserFindAllInput } from './dto/user.find-all.input';
import { UsersResponseDto } from './dto/users.response.dto';
import { UserResponseDto } from './dto/user.response.dto';

export type User = any;

@Injectable()
export class UserService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        userId: 1,
        email: 'wprk14@gmail.com',
        password: 'changeme',
      },
      {
        userId: 2,
        email: 'chris@example.com',
        password: 'secret',
      },
      {
        userId: 3,
        email: 'maria@example.com',
        password: 'guess',
      },
    ];
  }

  async findAll(
    criteria: UserFindAllInput,
  ): Promise<UsersResponseDto> {
    const total = this.users.length // await this.userRepository.count(getAsFindManyOptions(criteria))
    const users = this.users // await this.categoryRepository.find(getAsFindManyOptions(criteria))

    return {
      data: classToClass(users),
      limit: criteria.limit,
      page: criteria.page,
      total,
    }
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email)
  }

  async findOne(userId: number): Promise<UserResponseDto> {
    return {
      data: this.users.find(user => user.userId === userId)
    }
  }
}
