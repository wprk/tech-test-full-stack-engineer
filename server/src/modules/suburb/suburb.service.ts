import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Suburb } from '../../models/suburb.model'
import { SuburbFindAllInput } from './dto/suburb.find-all.input'
import { SuburbResponseDto } from './dto/suburb.response.dto'
import { SuburbsResponseDto } from './dto/suburbs.response.dto'
import { getAsFindManyOptions } from '../../utils/repository-find-options.util'

@Injectable()
export class SuburbService {
  constructor(
    @InjectRepository(Suburb)
    private readonly suburbRepository: Repository<Suburb>,
  ) {}

  async findAll(
    criteria: SuburbFindAllInput,
  ): Promise<SuburbsResponseDto> {
    const total = await this.suburbRepository.count(getAsFindManyOptions(criteria))

    return {
      data: await this.suburbRepository.find(getAsFindManyOptions(criteria)),
      limit: criteria.limit,
      page: criteria.page,
      total,
    }
  }

  async findOne(id: number): Promise<SuburbResponseDto> {
    return {
      data: await this.suburbRepository.findOneOrFail(id)
    }
  }
}
