import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

import { Category } from './category.model'
import { Suburb } from './suburb.model'

@Entity("jobs")
export class Job {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  status: string

  @Column()
  suburb_id: number
  @OneToOne(() => Suburb)
  @JoinColumn({ name: 'suburb_id', referencedColumnName: 'id' })
  suburb: Suburb

  @Column()
  category_id: number
  @OneToOne(() => Category)
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  category: Category

  @Column()
  contact_name: string

  @Column()
  contact_email: string

  @Column()
  contact_phone: string

  @Column()
  price: number

  @Column()
  description: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
