import { Expose } from 'class-transformer'
import { IsEnum, IsOptional } from 'class-validator'

import { PaginationInput } from '../../../dto/pagination.input'
import { JobStatus, JobRelationships } from '../../../models/job.model'

export class JobFindAllInput extends PaginationInput {
  @Expose()
  @IsEnum(JobStatus)
  @IsOptional()
  status: string

  @IsEnum(JobRelationships, { each: true })
  @IsOptional()
  with: string[]
}