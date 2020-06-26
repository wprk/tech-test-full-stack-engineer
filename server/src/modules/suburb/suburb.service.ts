import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Suburb } from 'src/models/suburb.model'

@Injectable()
export class SuburbService {
  constructor(
    @InjectRepository(Suburb)
    private readonly suburbRepository: Repository<Suburb>,
  ) {}

  async findAll(): Promise<Suburb[]> {
    return this.suburbRepository.find()
  }

  async findOne(id: number): Promise<Suburb> {
    return this.suburbRepository.findOne(id)
  }
}
