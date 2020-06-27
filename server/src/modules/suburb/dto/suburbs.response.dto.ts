import { Suburb } from '../../../models/suburb.model'

export class SuburbsResponseDto {
  data: Suburb[]
  page: number
  limit: number
  total: number
}