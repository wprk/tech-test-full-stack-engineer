import { Resource } from 'rest-hooks'
import moment from 'moment'

export enum JobStatus {
  NEW = 'new',
  ACCEPTED = "accepted",
  DECLINED = "declined"
}

export default class JobResource extends Resource {
  readonly id: number | undefined = undefined
  readonly category_id: number | null = null
  readonly contact_name: string = ''
  readonly contact_email: string = ''
  readonly contact_phone: string = ''
  readonly created_at: Date = new Date(0)
  readonly description: string = ''
  readonly price: number = 0
  readonly status: JobStatus = JobStatus.NEW
  readonly suburb_id: number | null = null
  readonly updated_at: Date = new Date(0)

  pk() {
    return this.id?.toString();
  }

  get createdAt() {
    return moment(this.created_at);
  }

  get updatedAt() {
    return moment(this.updated_at);
  }

  static urlRoot = 'http://localhost:8080/jobs';

  static listShape<T extends typeof Resource>(this: T) {
    return {
      ...super.listShape(),
      schema: { data: [this.asSchema()] },
    };
  }
}