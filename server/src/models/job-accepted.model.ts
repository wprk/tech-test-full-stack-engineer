import {
  ChildEntity,
  Column,
} from 'typeorm'

import { Job, JobStatus } from './job.model'
import { Exclude } from 'class-transformer'

@ChildEntity(JobStatus.ACCEPTED)
export class JobAccepted extends Job {
  // @Exclude()
  @Column()
  accepted_by: number

  @Column()
  contact_name: string

  @Column()
  contact_email: string

  @Column()
  contact_phone: string
}
