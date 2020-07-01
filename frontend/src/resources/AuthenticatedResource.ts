import BaseResource from './BaseResource'
import accessTokenProvider from '../helpers/accessTokenProvider'

export default abstract class AuthenticatedResource extends BaseResource {
  static fetchOptionsPlugin = (options: RequestInit) => {
    const token = accessTokenProvider.getAccessToken() // useContext(AuthContext)
    let headers: HeadersInit = { ...options.headers }

    if (token) {
      headers = {
        ...headers,
        Authorization: `Bearer ${token}`
      }
    }
  
    return {
      ...options,
      headers,
    }
  }
}