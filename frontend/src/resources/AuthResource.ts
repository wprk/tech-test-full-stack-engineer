import { Resource } from 'rest-hooks'

import BaseResource from './BaseResource'
import { AUTH_PATH } from '../config/index'

interface LoginRequestParams {
  remember_me?: boolean,
}

interface LoginRequestBody {
  email: string,
  password: string,
}

export default class AuthResource extends BaseResource {
  readonly access_token: string = ''

  pk() {
    return this.access_token
  }

  static urlRoot = `${AUTH_PATH}/auth/login`

  static loginShape<T extends typeof Resource>(this: T) {
    return {
      ...super.detailShape(),
      schema: this.asSchema(),
      fetch: (
        params: LoginRequestParams,
        body: LoginRequestBody,
      ) => {
        return this.fetch('post', this.listUrl(params as any), body);
      },
    }
  }
}
