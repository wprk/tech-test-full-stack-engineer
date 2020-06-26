import {
  Controller,
  Get,
  Param,
  Patch,
  ParseIntPipe,
  Body
} from '@nestjs/common'

import { Job } from 'src/models/job.model'
import { JobService } from './job.service'
import { UpdateJobDto } from './updateJob.dto'

@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get('/')
  async findAll(): Promise<Job[]> {
    return await this.jobService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Job> {
    return await this.jobService.findOne(id)
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() changes: UpdateJobDto,
  ): Promise<Job> {
    return await this.jobService.update(id, changes)
  }
}
