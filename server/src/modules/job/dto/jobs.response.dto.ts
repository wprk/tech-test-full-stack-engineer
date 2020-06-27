import { Job } from '../../../models/job.model'

export class JobsResponseDto {
  data: Job[]
  page: number
  limit: number
  total: number
}