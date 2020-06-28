import BaseResource from './BaseResource'
import { AUTH_LOCALSTORAGE_KEY } from '../providers/AuthProvider'

function useAuthToken() {
  const session: string | null = localStorage.getItem(AUTH_LOCALSTORAGE_KEY) 
    
  if (session) {
    const sessionObj = JSON.parse(session)
    const { token } = sessionObj

    return token
  }

  return null
}

export default abstract class AuthenticatedResource extends BaseResource {
  static fetchOptionsPlugin = (options: RequestInit) => {
    const token = useAuthToken()
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