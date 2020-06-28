import { classToClass } from "class-transformer";
import {
  BadRequestException,
  Injectable,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { JobFindAllInput } from './dto/job.find-all.input'
import { JobFindOneInput } from "./dto/job.find-one.input";
import { JobUpdateInput } from './dto/job.update.input'
import { JobResponseDto } from './dto/job.response.dto'
import { JobsResponseDto } from './dto/jobs.response.dto'
import { Job, JobStatus } from '../../models/job.model'
import { getAsFindManyOptions, getAsFindOneOptions } from '../../utils/repository-find-options.util'

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
  ) {}

  async findAll(
    criteria: JobFindAllInput,
  ): Promise<JobsResponseDto> {
    const total = await this.jobRepository.count(getAsFindManyOptions(criteria))
    const jobs = await this.jobRepository.find(getAsFindManyOptions(criteria))

    return {
      data: classToClass(jobs),
      limit: criteria.limit,
      page: criteria.page,
      total,
    }
  }

  async findOne(
    id: number,
    criteria: JobFindOneInput,
  ): Promise<JobResponseDto> {
    const job = await this.jobRepository.findOneOrFail(id, getAsFindOneOptions(criteria))

    return {
      data: classToClass(job)
    }
  }

  async update(id: number, data: JobUpdateInput): Promise<JobResponseDto> {
    let job = await this.jobRepository.findOneOrFail(id)

    if (!this.isValidNextStatuses(job.status, data.status)) {
      throw new BadRequestException(`Unable to change status for job ${job.id} to ${data.status}`)
    }

    job.status = data.status

    job = await this.jobRepository.save(job);

    return {
      data: classToClass(job)
    }
  }

  isValidNextStatuses(currentStatus: string, newStatus: string): boolean {
    return this.getValidNextStatuses(currentStatus).includes(newStatus)
  }

  getValidNextStatuses(currentStatus: string): string[] {
    switch(currentStatus) {
      case JobStatus.ACCEPTED:
        return [JobStatus.ACCEPTED]
      case JobStatus.DECLINED:
        return [JobStatus.DECLINED]
      case JobStatus.NEW:
        return [JobStatus.ACCEPTED, JobStatus.DECLINED]
      default:
        return []
    }
  }
}
