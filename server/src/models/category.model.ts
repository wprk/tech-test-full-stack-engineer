import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { Job } from './job.model'

@Entity("categories")
export class Category {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  parent_category_id: number
  @OneToOne(() => Category)
  @JoinColumn({ name: 'parent_category_id', referencedColumnName: 'id' })
  parent: Category

  @OneToMany(() => Category, (category: Category) => category.parent_category_id)
  children: Category[];

  @OneToMany(() => Job, (job: Job) => job.category_id)
  jobs: Job[];
}
