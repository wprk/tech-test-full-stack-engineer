import React, { useEffect, useState, ReactNode } from 'react'
import jwtDecoder from 'jwt-decode'
import { useFetcher } from 'rest-hooks'
import AuthResource from '../resources/AuthResource'

export const AUTH_LOCALSTORAGE_KEY = 'auth'
const DUMMY_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU5MzQyNjUzMiwiZXhwIjoxNjA5NDU5MTk5fQ.b7oTadgi836E4w_2H1687z1LaVFJo9FgiUNWGqN9vqc'

interface Auth {
  expiry: number | null,
  token: string | null,
  userId: string | null,
}

export interface AuthContextType extends Auth {
  error: string | null,
  hasError: boolean,
  isAuthenticating: boolean,
  isAuthenticated: boolean,
  onLogin: (email: string, password: string) => void,
  onLoginWithFacebook: () => void,
  onLoginWithTwitter: () => void,
  onLoginWithGitHub: () => void,
  onLogout: () => void
}

const DEFAULT_AUTH: Auth = {
  expiry: null,
  token: null,
  userId: null
}

const DEFAULT_AUTHCONTEXT: AuthContextType = {
  ...DEFAULT_AUTH,
  error: null,
  hasError: false,
  isAuthenticating: true,
  isAuthenticated: false,
  onLogin: () => {},
  onLoginWithFacebook: () => {},
  onLoginWithTwitter: () => {},
  onLoginWithGitHub: () => {},
  onLogout: () => {}
}

export const AuthContext = React.createContext(DEFAULT_AUTHCONTEXT)
export const AuthConsumer = AuthContext.Consumer

interface IProps {
  children: ReactNode
}

const AuthProvider = ({ children }: IProps) => {
  const login = useFetcher(AuthResource.loginShape());

  const [auth, setAuth] = useState<Auth>(DEFAULT_AUTH)
  const [error, setError] = useState<string | null>(DEFAULT_AUTHCONTEXT.error)
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(DEFAULT_AUTHCONTEXT.isAuthenticating)

  useEffect(() => {
    // Check if currently logged in
    const session: string | null = localStorage.getItem(AUTH_LOCALSTORAGE_KEY)
    
    if (session) {
      const sessionObj = JSON.parse(session)
      const { exp, token, userId } = sessionObj

      if (exp > Math.floor(new Date().getTime() / 1000)) {
        loginSuccess(token, userId, exp)
      } else {
        logoutSuccess()
      }
    } else {
      setIsAuthenticating(false)
    }
  }, [])

  const onLogin = async (email: string, password: string) => {
    setError(null)
    setIsAuthenticating(true)
    try {
      const response = await login({}, { email, password })

      if (response && response.data) {
        handleAuthentication(response.data.access_token)
      }
    } catch (error) {
      setError('Unable to login. Please try again.')
      logoutSuccess()
    }
  }

  const onLoginWithFacebook = async () => {
    setError(null)
    setIsAuthenticating(true)

    // Would get a token here from the provider and pass it to handleAuthentication method
    handleAuthentication(DUMMY_TOKEN)
  }

  const onLoginWithTwitter = async () => {
    setError(null)
    setIsAuthenticating(true)

    // Would get a token here from the provider and pass it to handleAuthentication method
    handleAuthentication(DUMMY_TOKEN)
  }

  const onLoginWithGitHub = async () => {
    setError(null)
    setIsAuthenticating(true)

    // Would get a token here from the provider and pass it to handleAuthentication method
    handleAuthentication(DUMMY_TOKEN)
  }

  const onLogout = async () => {
    setIsAuthenticating(true)

    logoutSuccess()
  }

  const handleAuthentication = (token: string) => {
    setTimeout(() => {
      const decodedToken: any = jwtDecoder(token)
      const { userId, exp } = decodedToken
  
      localStorage.setItem(
        AUTH_LOCALSTORAGE_KEY,
        JSON.stringify({ exp, token, userId })
      )
  
      loginSuccess(token, userId, exp)
    }, 500)
  }

  const loginSuccess = async (token: string, userId: string, expiry: number) => {
    setAuth({ expiry, token, userId })
    setIsAuthenticating(false)
  }

  const logoutSuccess = async () => {
    localStorage.removeItem(AUTH_LOCALSTORAGE_KEY)
    setAuth(DEFAULT_AUTH)
    setIsAuthenticating(false)
  }

  return (
    <AuthContext.Provider
      value={{
        ...auth,
        error,
        hasError: !! error,
        isAuthenticating: isAuthenticating,
        isAuthenticated: !! auth.userId,
        onLogin,
        onLoginWithFacebook,
        onLoginWithTwitter,
        onLoginWithGitHub,
        onLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
