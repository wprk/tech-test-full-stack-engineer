import { Exclude, Expose } from 'class-transformer'
import {
  ChildEntity,
  Column,
} from 'typeorm'

import { Job, JobStatus } from './job.model';

@ChildEntity(JobStatus.DECLINED)
export class JobDeclined extends Job {
  @Exclude()
  @Column()
  contact_name: string

  @Expose({ name: 'contact_name' })
  get contact_first_name(): string {
    const nameParts = this.contact_name.split(' ');

    return nameParts[0];
  }
}
