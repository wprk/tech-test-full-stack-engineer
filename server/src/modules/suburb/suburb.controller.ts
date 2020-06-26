import {
  Controller,
  Get,
  Param,
  ParseIntPipe
} from '@nestjs/common'

import { Suburb } from 'src/models/suburb.model'
import { SuburbService } from './suburb.service'

@Controller('suburbs')
export class SuburbController {
  constructor(private readonly suburbService: SuburbService) {}

  @Get('/')
  async findAll(): Promise<Suburb[]> {
    return await this.suburbService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Suburb> {
    return await this.suburbService.findOne(id)
  }
}
