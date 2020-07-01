import { classToClass } from "class-transformer";
import {
  BadRequestException,
  Injectable,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { AuthUser } from '../auth/interfaces/auth.user.interface'
import { JobFindAllInput } from './dto/job.find-all.input'
import { JobFindOneInput } from "./dto/job.find-one.input";
import { JobUpdateInput } from './dto/job.update.input'
import { JobResponseDto } from './dto/job.response.dto'
import { JobsResponseDto } from './dto/jobs.response.dto'
import { JobStatus } from '../../models/job.model'
import { JobRepository } from "src/repositories/job.repository";
import { User } from "src/models/user.model";

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(JobRepository)
    private readonly jobRepository: JobRepository,
  ) {}

  async findAll(
    authUser: AuthUser,
    criteria: JobFindAllInput,
  ): Promise<JobsResponseDto> {
    const total = await this.jobRepository.countJobsByCriteria(criteria, authUser)
    const jobs = await this.jobRepository.findJobsByCriteria(criteria, authUser)

    return {
      data: classToClass(jobs),
      limit: criteria.limit,
      page: criteria.page,
      total,
    }
  }

  async findOne(
    authUser: AuthUser,
    id: number,
    criteria: JobFindOneInput,
  ): Promise<JobResponseDto> {
    const job = await this.jobRepository.findOneJobByCriteria(id, criteria, authUser)

    return {
      data: classToClass(job)
    }
  }

  async update(
    authUser: AuthUser,
    id: number,
    data: JobUpdateInput
  ): Promise<JobResponseDto> {
    let job = await this.jobRepository.findOneOrFail(id)

    if (!this.isValidNextStatuses(job.status, data.status)) {
      throw new BadRequestException(`Unable to change status for job ${job.id} to ${data.status}`)
    }

    await this.jobRepository.update({ id: job.id }, data)
    job = await this.jobRepository.findOneOrFail(id)
    
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
