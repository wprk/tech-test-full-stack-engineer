import { Resource } from 'rest-hooks'

export default abstract class BaseResource extends Resource {
  static listUrl({ with: relations, ...searchParams }: any): string {
    if (!Array.isArray(relations)) {
      return super.listUrl(searchParams)
    }

    const params = new URLSearchParams(searchParams as any)
    relations.forEach((relation: string) => {
      params.append('with', relation)
    })
    params.sort()

    return `${this.urlRoot}?${params.toString()}`
  }
}
