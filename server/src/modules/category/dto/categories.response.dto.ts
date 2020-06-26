import { Job } from '../../../models/job.model'
import { Category } from 'src/models/category.model'

export class CategoriesResponseDto {
  data: Category[]
  page: number
  limit: number
  total: number
}