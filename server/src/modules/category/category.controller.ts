import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common'

import { CategoryService } from './category.service'
import { CategoriesResponseDto } from './dto/categories.response.dto'
import { CategoryFindAllInput } from './dto/category.find-all.input'
import { CategoryResponseDto } from './dto/category.response.dto'

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/')
  async findAll(
    @Query() criteria: CategoryFindAllInput,
  ): Promise<CategoriesResponseDto> {
    return await this.categoryService.findAll(criteria)
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number
  ): Promise<CategoryResponseDto> {
    return await this.categoryService.findOne(id)
  }
}
