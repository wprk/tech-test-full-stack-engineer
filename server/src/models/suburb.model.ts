import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { Job } from './job.model'

@Entity("suburbs")
export class Suburb {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  postcode: string

  @OneToMany(() => Job, (job: Job) => job.suburb_id)
  jobs: Job[];
}
