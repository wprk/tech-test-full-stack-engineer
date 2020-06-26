import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query
} from '@nestjs/common'

import { SuburbFindAllInput } from './dto/suburb.find-all.input'
import { SuburbResponseDto } from './dto/suburb.response.dto'
import { SuburbsResponseDto } from './dto/suburbs.response.dto'
import { SuburbService } from './suburb.service'

@Controller('suburbs')
export class SuburbController {
  constructor(private readonly suburbService: SuburbService) {}

  @Get('/')
  async findAll(
    @Query() criteria: SuburbFindAllInput,
  ): Promise<SuburbsResponseDto> {
    return await this.suburbService.findAll(criteria)
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number
  ): Promise<SuburbResponseDto> {
    return await this.suburbService.findOne(id)
  }
}
