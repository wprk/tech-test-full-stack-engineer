import { Resource } from 'rest-hooks'

import AuthenticatedResource from './AuthenticatedResource'
import { API_PATH } from '../config/index'

export default class CategoryResource extends AuthenticatedResource {
  readonly id: number | undefined = undefined
  readonly name: string = ''
  readonly parent_category_id: number | null = null

  pk() {
    return this.id?.toString()
  }

  static urlRoot = `${API_PATH}/categories`

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
