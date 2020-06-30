import { Job, JobStatus } from '../models/job.model'
import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { User } from 'src/models/user.model';

class JobScopes extends SelectQueryBuilder<Job> {
  constructor(private authUser: User, builder: SelectQueryBuilder<Job>) {
    super(builder);
  }

  get accepted(): JobScopes {
    return this.andWhere("status = :status", { status: JobStatus.ACCEPTED })
      .andWhere("accepted_by = :authUserId", { authUserId: this.authUser.id })
  }

  get declined(): JobScopes {
    return this.andWhere("status = :status", { status: JobStatus.DECLINED })
  }

  get new(): JobScopes {
    return this.andWhere("status = :status", { status: JobStatus.NEW })
  }
}

@EntityRepository(Job)
export class JobRepository extends Repository<Job> {
  asUser(authUser: User): JobScopes {
    return new JobScopes(authUser, this.createQueryBuilder("job"))
  }
}