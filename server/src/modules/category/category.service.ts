import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CategoriesResponseDto } from './dto/categories.response.dto'
import { CategoryFindAllInput } from './dto/category.find-all.input'
import { CategoryResponseDto } from './dto/category.response.dto'
import { Category } from '../../models/category.model'
import { getAsFindManyOptions } from '../../utils/repository-find-options.util'

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAll(
    criteria: CategoryFindAllInput,
  ): Promise<CategoriesResponseDto> {
    const total = await this.categoryRepository.count()

    return {
      data: await this.categoryRepository.find(getAsFindManyOptions(criteria)),
      limit: criteria.limit,
      page: criteria.page,
      total,
    }
  }

  async findOne(id: number): Promise<CategoryResponseDto> {
    return {
      data: await this.categoryRepository.findOneOrFail(id)
    }
  }
}
