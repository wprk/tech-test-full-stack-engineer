import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  ParseIntPipe,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common'

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { JwtAccessPayload } from '../auth/interfaces/jwt.access.payload.interface'
import { JobFindAllInput } from './dto/job.find-all.input'
import { JobFindOneInput } from './dto/job.find-one.input'
import { JobUpdateInput } from './dto/job.update.input'
import { JobsResponseDto } from './dto/jobs.response.dto'
import { JobResponseDto } from './dto/job.response.dto'
import { JobService } from './job.service'
import { Request } from 'express'

@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async findAll(
    @Req() req: Request,
    @Query() criteria: JobFindAllInput,
  ): Promise<JobsResponseDto> {   
    return await this.jobService.findAll(req.user as JwtAccessPayload, criteria)
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @Query() criteria: JobFindOneInput,
  ): Promise<JobResponseDto> {
    return await this.jobService.findOne(req.user as JwtAccessPayload, id, criteria)
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() changes: JobUpdateInput,
  ): Promise<JobResponseDto> {
    return await this.jobService.changeStatus(req.user as JwtAccessPayload, id, changes)
  }
}
