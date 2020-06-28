import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { JobFindAllInput } from './dto/job.find-all.input'
import { JobUpdateInput } from './dto/job.update.input'
import { JobResponseDto } from './dto/job.response.dto'
import { JobsResponseDto } from './dto/jobs.response.dto'
import { Job, JobStatus } from '../../models/job.model'
import { getAsFindManyOptions } from '../../utils/repository-find-options.util'

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

    return {
      data: await this.jobRepository.find(getAsFindManyOptions(criteria)),
      limit: criteria.limit,
      page: criteria.page,
      total,
    }
  }

  async findOne(id: number): Promise<JobResponseDto> {
    return {
      data: await this.jobRepository.findOneOrFail(id)
    }
  }

  async update(id: number, data: JobUpdateInput): Promise<JobResponseDto> {
    const job = await this.jobRepository.findOneOrFail(id)

    if (!this.isValidNextStatuses(job.status, data.status)) {
      throw new BadRequestException(`Unable to change status for job ${job.id} to ${data.status}`)
    }

    job.status = data.status

    return {
      data: await this.jobRepository.save(job)
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
