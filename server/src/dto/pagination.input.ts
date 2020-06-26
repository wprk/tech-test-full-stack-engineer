import { isNumber } from "util"

import { Transform } from 'class-transformer'
import { IsInt, IsOptional } from 'class-validator'

export class PaginationInput {
  @Transform(parseInt)
  @IsInt()
  @IsOptional()
  limit: number
  
  @Transform(parseInt)
  @IsInt()
  @IsOptional()
  page: number
}