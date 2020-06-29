import { Injectable } from '@nestjs/common';

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

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }
}
