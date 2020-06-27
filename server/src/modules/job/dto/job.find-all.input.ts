import { JobStatus } from '../../../models/job.model'
import { Expose } from 'class-transformer'
import { IsEnum, IsOptional } from 'class-validator'
import { PaginationInput } from '../../../dto/pagination.input'

export class JobFindAllInput extends PaginationInput {
  @Expose()
  @IsEnum(JobStatus)
  @IsOptional()
  status: string
}