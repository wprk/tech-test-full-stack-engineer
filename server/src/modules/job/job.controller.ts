import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  ParseIntPipe,
  Query,
} from '@nestjs/common'

import { JobFindAllInput } from './dto/job.find-all.input'
import { JobUpdateInput } from './dto/job.update.input'
import { JobsResponseDto } from './dto/jobs.response.dto'
import { JobResponseDto } from './dto/job.response.dto'
import { JobService } from './job.service'

@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get('/')
  async findAll(
    @Query() criteria: JobFindAllInput,
  ): Promise<JobsResponseDto> {   
    return await this.jobService.findAll(criteria)
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<JobResponseDto> {
    return await this.jobService.findOne(id)
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() changes: JobUpdateInput,
  ): Promise<JobResponseDto> {
    return await this.jobService.update(id, changes)
  }
}
