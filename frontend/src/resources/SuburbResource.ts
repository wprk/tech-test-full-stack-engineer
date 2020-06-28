import { Resource } from 'rest-hooks'

import { API_PATH } from '../config/index'

export default class SuburbResource extends Resource {
  readonly id: number | undefined = undefined
  readonly name: string = ''
  readonly postcode: string = ''

  pk() {
    return this.id?.toString();
  }

  static urlRoot = `${API_PATH}/suburbs`;

  static detailShape<T extends typeof Resource>(this: T) {
    return {
      ...super.detailShape(),
      schema: { data: this.asSchema() },
    };
  }

  static listShape<T extends typeof Resource>(this: T) {
    return {
      ...super.listShape(),
      schema: { data: [this.asSchema()] },
    };
  }
}
