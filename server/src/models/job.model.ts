import { Exclude, Expose } from 'class-transformer'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
  UpdateDateColumn
} from 'typeorm'

import { Category } from './category.model'
import { Suburb } from './suburb.model'

export enum JobRelationships {
  SUBURB = 'suburb',
  CATEGORY = "category",
}

export enum JobStatus {
  NEW = 'new',
  ACCEPTED = "accepted",
  DECLINED = "declined"
}

@Entity("jobs")
@TableInheritance({ column: { enum: JobStatus, type: "enum", name: "status" } })
export abstract class Job {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: "enum",
    enum: JobStatus,
    default: JobStatus.NEW
  })
  status: string

  @Exclude()
  @Column()
  suburb_id: number
  @OneToOne(() => Suburb)
  @JoinColumn({ name: 'suburb_id', referencedColumnName: 'id' })
  [JobRelationships.SUBURB]: Suburb

  @Exclude()
  @Column()
  category_id: number
  @OneToOne(() => Category)
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  [JobRelationships.CATEGORY]: Category

  @Column()
  price: number

  @Column()
  description: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
