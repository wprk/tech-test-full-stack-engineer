import { Job } from 'src/models/job.model'

export class JobsResponseDto {
  data: Job[]
  page: number
  limit: number
  total: number
}