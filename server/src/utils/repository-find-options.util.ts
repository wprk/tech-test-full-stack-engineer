import { FindManyOptions, FindOneOptions, ObjectLiteral, FindConditions } from "typeorm"

export const getAsFindManyOptions = ({
  limit,
  page,
  with: relations,
  ...criteria
}: any): FindManyOptions<any> => {
  return {
    relations: relations || [],
    skip: (page - 1) * limit,
    take: limit,
    where: removeUndefinedCriteria(criteria),
  }
}

export const getAsFindOneOptions = ({
  with: relations,
  ...criteria
}): FindOneOptions<any> => {
  return {
    relations,
    where: removeUndefinedCriteria(criteria),
  }
}

const removeUndefinedCriteria = (
  criteria: ObjectLiteral | FindConditions<any> | FindConditions<any>[]
): string | ObjectLiteral | FindConditions<any> | FindConditions<any>[] => {
  Object.keys(criteria).forEach((key) => (criteria[key] == null) && delete criteria[key])

  return criteria;
}