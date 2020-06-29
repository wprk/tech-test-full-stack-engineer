import { Resource } from 'rest-hooks'

import BaseResource from './BaseResource'
import { AUTH_PATH } from '../config/index'

export default class AuthResource extends BaseResource {
  readonly access_token: string = ''

  pk() {
    return this.access_token
  }

  static urlRoot = `${AUTH_PATH}/auth`

  static loginShape<T extends typeof Resource>(this: T) {
    return {
      ...super.detailShape(),
      schema: this.asSchema(),
      getFetchKey: () => {
        return '/login';
      },
      fetch: (params = {}) => {
        return this.fetch('post', `/login`);
      },
    }
  }
}
