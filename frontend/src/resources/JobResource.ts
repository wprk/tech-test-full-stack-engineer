import { MutateShape, SchemaDetail, AbstractInstanceType, Resource } from 'rest-hooks'
import moment from 'moment'

import { API_PATH } from '../config/index'
import AuthenticatedResource from './AuthenticatedResource'
import CategoryResource from './CategoryResource'
import SuburbResource from './SuburbResource'

export enum JobStatus {
  NEW = 'new',
  ACCEPTED = "accepted",
  DECLINED = "declined"
}

export default class JobResource extends AuthenticatedResource {
  readonly id: number | undefined = undefined
  readonly category: CategoryResource | null = null
  readonly contact_name: string = ''
  readonly contact_email: string = ''
  readonly contact_phone: string = ''
  readonly created_at: Date = new Date(0)
  readonly description: string = ''
  readonly price: number = 0
  readonly status: JobStatus = JobStatus.NEW
  readonly suburb: SuburbResource | null = null
  readonly updated_at: Date = new Date(0)

  pk() {
    return this.id?.toString()
  }

  get createdAt(): moment.Moment {
    return moment(this.created_at)
  }

  get firstInitial(): string {
    return this.contact_name.charAt(0).toUpperCase()
  }

  get updatedAt(): moment.Moment {
    return moment(this.updated_at)
  }

  static urlRoot = `${API_PATH}/jobs`

  static detailShape<T extends typeof Resource>(this: T) {
    return {
      ...super.detailShape(),
      schema: { data: this.asSchema() },
    }
  }

  static listShape<T extends typeof Resource>(this: T) {
    return {
      ...super.listShape(),
      schema: { data: [this.asSchema()] },
    }
  }
  
  static partialUpdateShape<T extends typeof Resource>(
    this: T,
  ): MutateShape<
    SchemaDetail<Readonly<AbstractInstanceType<T>>>,
    Readonly<object>,
    Partial<AbstractInstanceType<T>>
  > {
    return {
      ...super.partialUpdateShape(),
      schema: { data: this.asSchema() },
    }
  }
}
