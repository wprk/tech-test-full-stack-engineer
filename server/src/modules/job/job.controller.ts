import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common'

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { JobFindAllInput } from './dto/job.find-all.input'
import { JobFindOneInput } from './dto/job.find-one.input'
import { JobUpdateInput } from './dto/job.update.input'
import { JobsResponseDto } from './dto/jobs.response.dto'
import { JobResponseDto } from './dto/job.response.dto'
import { JobService } from './job.service'

@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async findAll(
    @Query() criteria: JobFindAllInput,
  ): Promise<JobsResponseDto> {   
    return await this.jobService.findAll(criteria)
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query() criteria: JobFindOneInput,
  ): Promise<JobResponseDto> {
    return await this.jobService.findOne(id, criteria)
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() changes: JobUpdateInput,
  ): Promise<JobResponseDto> {
    return await this.jobService.update(id, changes)
  }
}
