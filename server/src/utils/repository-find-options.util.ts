import { FindManyOptions } from "typeorm"

export const getAsFindManyOptions = ({
  limit,
  page,
  ...criteria
}): FindManyOptions<any> => {
  return {
    skip: (page - 1) * limit,
    take: limit,
    where: criteria,
  }
}