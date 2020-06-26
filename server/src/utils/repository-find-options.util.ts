import { FindManyOptions } from "typeorm"

export const getAsFindManyOptions = ({
  limit,
  page,
  ...criteria
}): FindManyOptions<any> => {
  const pageNo = page || 1
  const perPage = limit || 5

  return {
    skip: (pageNo - 1) * perPage,
    take: perPage,
    where: criteria,
  }
}