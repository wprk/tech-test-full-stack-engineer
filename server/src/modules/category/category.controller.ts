import {
  Controller,
  Get,
  Param,
  ParseIntPipe
} from '@nestjs/common'

import { Category } from 'src/models/category.model'
import { CategoryService } from './category.service'

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/')
  async findAll(): Promise<Category[]> {
    return await this.categoryService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Category> {
    return await this.categoryService.findOne(id)
  }
}
