import { Suburb } from 'src/models/suburb.model'

export class SuburbsResponseDto {
  data: Suburb[]
  page: number
  limit: number
  total: number
}