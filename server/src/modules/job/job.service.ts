import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Job, JobStatus } from 'src/models/job.model'
import { UpdateJobDto } from './updateJob.dto'

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
  ) {}

  async findAll(): Promise<Job[]> {
    return await this.jobRepository.find()
  }

  async findOne(id: number): Promise<Job> {
    return await this.jobRepository.findOneOrFail(id)
  }

  async update(id: number, data: UpdateJobDto): Promise<Job> {
    const job = await this.findOne(id)

    if (!this.isValidNextStatuses(job.status, data.status)) {
      throw new BadRequestException(`Unable to change status for job ${job.id} to ${data.status}`)
    }

    job.status = data.status

    return this.jobRepository.save(job)
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
