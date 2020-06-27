import { JobStatus } from '../../../models/job.model'
import { IsEnum, IsOptional } from 'class-validator'
import { PaginationInput } from '../../../dto/pagination.input'

export class JobFindAllInput extends PaginationInput {
  @IsEnum(JobStatus)
  @IsOptional()
  status: string
}