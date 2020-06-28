import {
  ChildEntity,
  Column,
} from 'typeorm'

import { Job, JobStatus } from './job.model'
import { Expose } from 'class-transformer'

@ChildEntity(JobStatus.ACCEPTED)
export class JobAccepted extends Job {
  @Column()
  contact_name: string

  @Column()
  contact_email: string

  @Column()
  contact_phone: string
}
