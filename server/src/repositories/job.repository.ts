import { Job, JobStatus, JobRelationships } from '../models/job.model'
import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';

import { JobAccepted } from 'src/models/job-accepted.model';
import { JwtAccessPayload } from 'src/modules/auth/interfaces/jwt.access.payload.interface';
import { JobFindOneInput } from 'src/modules/job/dto/job.find-one.input';
import { JobFindAllInput } from 'src/modules/job/dto/job.find-all.input';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@EntityRepository(Job)
export class JobRepository extends Repository<Job> {
  changeStatus(
    id: number,
    status: JobStatus,
    authUser: JwtAccessPayload
  ) {
    let jobPartial: QueryDeepPartialEntity<JobAccepted> = { status }

    if (status === JobStatus.ACCEPTED) {
      jobPartial['accepted_at'] = new Date
      jobPartial['accepted_by'] = authUser.userId
    }

    return this.update({ id }, jobPartial)
  }

  countJobsByCriteria(
    {
      page,
      limit,
      status,
      with: relations = []
    }: JobFindAllInput,
    authUser: JwtAccessPayload = null
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
  authUser: JwtAccessPayload = null
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
    authUser: JwtAccessPayload = null
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
