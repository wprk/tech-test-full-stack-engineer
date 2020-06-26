import { JobStatus } from '../../../models/job.model'
import { IsString } from 'class-validator'

export class JobUpdateInput {
  @IsString()
  status: JobStatus
}