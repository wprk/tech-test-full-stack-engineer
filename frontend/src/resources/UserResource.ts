import { Resource } from 'rest-hooks';
import moment from 'moment'

import AuthenticatedResource from './AuthenticatedResource'
import { AUTH_PATH } from '../config/index'

export default class UserResource extends AuthenticatedResource {
  readonly id: number | undefined = undefined
  readonly email: string = ''
  readonly name: string = ''
  readonly created_at: Date = new Date(0)
  readonly updated_at: Date = new Date(0)

  pk() {
    return this.id?.toString()
  }

  get createdAt(): moment.Moment {
    return moment(this.created_at)
  }

  get updatedAt(): moment.Moment {
    return moment(this.updated_at)
  }

  static urlRoot = `${AUTH_PATH}/users`

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

  static currentShape<T extends typeof Resource>(this: T) {
    return {
      ...this.detailShape(),
      getFetchKey: () => {
        return `${this.urlRoot}/current`
      },
      fetch: (params: {}, body?: Readonly<object | string>) => {
        return this.fetch('get', `${this.urlRoot}/current`, body)
      },
    }
  }
}
