import { Job, JobStatus, JobRelationships } from '../models/job.model'
import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';

import { AuthUser } from 'src/modules/auth/interfaces/auth.user.interface';
import { JobFindOneInput } from 'src/modules/job/dto/job.find-one.input';
import { JobFindAllInput } from 'src/modules/job/dto/job.find-all.input';
import { Category } from 'src/models/category.model';

@EntityRepository(Job)
export class JobRepository extends Repository<Job> {
  countJobsByCriteria(
    {
      page,
      limit,
      status,
      with: relations = []
    }: JobFindAllInput,
    authUser: AuthUser = null
  ) {
    let query: SelectQueryBuilder<Job> = this.getSelectQueryBuilder()
    let skip: number = (page - 1) * limit
    let take: number = limit

    if (status) {
      query = query.where("jobs.status = :status", { status })

      if (status === JobStatus.ACCEPTED) {
        query = query.where("jobs.accepted_by = :authUserId", { authUserId: authUser.userId })
      }
    } else {
      query = query.where("jobs.status != :status", { status: JobStatus.ACCEPTED })
    }

    query = query.skip(skip)
    query = query.take(take)

    relations.forEach((relation: string) => {
      query = query.leftJoinAndSelect(`jobs.${relation}`, relation)
    })

    return query.getCount()
  }

  findJobsByCriteria({
    page,
    limit,
    status,
    with: relations = []
  }: JobFindAllInput,
  authUser: AuthUser = null
) {
    let query: SelectQueryBuilder<Job> = this.getSelectQueryBuilder()
    let skip: number = (page - 1) * limit
    let take: number = limit

    if (status) {
      query = query.where("jobs.status = :status", { status })

      if (status === JobStatus.ACCEPTED) {
        query = query.where("jobs.accepted_by = :authUserId", { authUserId: authUser.userId })
      }
    } else {
      query = query.where("jobs.status != :status", { status: JobStatus.ACCEPTED })
    }

    query.skip(skip)
    query.take(take)

    relations.forEach((relation: string) => {
      query = query.leftJoinAndSelect(`jobs.${relation}`, relation)
    })

    return query.getMany()
  }

  findOneJobByCriteria(
    id: number,
    {
      with: relations
    }: JobFindOneInput,
    authUser: AuthUser = null
  ) {
    return this.findOneOrFail(id, { relations })
  }

  private getQueryBuilder()
  {
    return this.createQueryBuilder("jobs")
  }

  private getSelectQueryBuilder()
  {
    return this.getQueryBuilder().select()
  }
}
