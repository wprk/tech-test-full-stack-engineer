import { classToClass } from 'class-transformer'
import { Injectable, HttpException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserFindAllInput } from './dto/user.find-all.input';
import { UsersResponseDto } from './dto/users.response.dto';
import { UserResponseDto } from './dto/user.response.dto';
import { User } from 'src/models/user.model';
import { getAsFindManyOptions } from 'src/utils/repository-find-options.util';
import { AuthRegisterInput } from '../auth/dto/auth.register.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(newUser: AuthRegisterInput): Promise<User> {
    if (await this.userRepository.count({ where: { email: newUser.email }}) >= 1) {
      throw new BadRequestException(`Accoount already exists for ${newUser.email}.`)
    }

    const user = this.userRepository.create(newUser)
    await this.userRepository.save(user)

    return classToClass(user)
  }

  async findAll(
    criteria: UserFindAllInput,
  ): Promise<UsersResponseDto> {
    const total = await this.userRepository.count(getAsFindManyOptions(criteria))
    const users = await this.userRepository.find(getAsFindManyOptions(criteria))

    return {
      data: classToClass(users),
      limit: criteria.limit,
      page: criteria.page,
      total,
    }
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { email }})
  }

  async findOne(id: number): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne(id)

    return {
      data: classToClass(user)
    }
  }
}
