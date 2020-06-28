import { FindManyOptions } from "typeorm"

export const getAsFindManyOptions = ({
  limit,
  page,
  ...criteria
}): FindManyOptions<any> => {
  return {
    skip: (page - 1) * limit,
    take: limit,
    where: removeUndefinedCriteria(criteria),
  }
}

const removeUndefinedCriteria = (criteria): object => {
  Object.keys(criteria).forEach((key) => (criteria[key] == null) && delete criteria[key])

  return criteria;
}