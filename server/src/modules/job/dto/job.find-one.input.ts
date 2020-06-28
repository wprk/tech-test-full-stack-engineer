import { IsEnum, IsOptional } from 'class-validator'
import { JobRelationships } from '../../../models/job.model'

export class JobFindOneInput {
  @IsEnum(JobRelationships, { each: true })
  @IsOptional()
  with: string[]
}