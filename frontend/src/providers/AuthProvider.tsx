import React, { useEffect, useState, ReactNode } from 'react'
import jwtDecoder from 'jwt-decode'
import { AUTH_PATH } from '../config'
import accessTokenProvider from '../helpers/accessTokenProvider'

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
  const [auth, setAuth] = useState<Auth>(DEFAULT_AUTH)
  const [error, setError] = useState<string | null>(DEFAULT_AUTHCONTEXT.error)
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(DEFAULT_AUTHCONTEXT.isAuthenticating)

  useEffect(() => {
    checkLoggedIn()
  }, [])

  const onLogin = async (email: string, password: string) => {
    setError(null)
    setIsAuthenticating(true)
    try {
      const { access_token, refresh_token } = await authLogin(email, password)
      if (access_token && refresh_token) {
        handleAuthentication(access_token, refresh_token)
      } else {
        throw Error('Invalid access or refresh token')
      }
    } catch (error) {
      console.error(error)
      setError('Unable to login. Please try again.')
      logoutSuccess()
    }
  }

  const onLoginWithFacebook = async () => {
    setError(null)
    setIsAuthenticating(true)

    // Would get a token here from the provider and pass it to handleAuthentication method
    handleAuthentication(DUMMY_TOKEN, DUMMY_TOKEN)
  }

  const onLoginWithTwitter = async () => {
    setError(null)
    setIsAuthenticating(true)

    // Would get a token here from the provider and pass it to handleAuthentication method
    handleAuthentication(DUMMY_TOKEN, DUMMY_TOKEN)
  }

  const onLoginWithGitHub = async () => {
    setError(null)
    setIsAuthenticating(true)

    // Would get a token here from the provider and pass it to handleAuthentication method
    handleAuthentication(DUMMY_TOKEN, DUMMY_TOKEN)
  }

  const onLogout = async () => {
    setIsAuthenticating(true)

    logoutSuccess()
  }

  const handleAuthentication = (accessToken: string, refreshToken: string) => {
    const decodedAccessToken: any = jwtDecoder(accessToken)
    const { userId, exp } = decodedAccessToken

    localStorage.setItem(
      AUTH_LOCALSTORAGE_KEY,
      JSON.stringify({ exp, token: refreshToken, userId })
    )

    loginSuccess(accessToken, userId, exp)
  }

  const loginSuccess = async (token: string, userId: string, expiry: number) => {
    accessTokenProvider.setAccessToken(token)
    setAuth({ expiry, token, userId })
    setIsAuthenticating(false)
  }

  const logoutSuccess = async () => {
    accessTokenProvider.setAccessToken('')

    localStorage.removeItem(AUTH_LOCALSTORAGE_KEY)
    setAuth(DEFAULT_AUTH)
    setIsAuthenticating(false)
  }

  const authLogin = async (email: string, password: string) => {
    try {
      const response = await fetch(`${AUTH_PATH}/auth/login`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json()
        if (result.data) {
          return result.data;
        } else {
          throw new Error('Invalid response received.')
        }
      } else {
        throw new Error('Login request failed.')
      }
    } catch (error) {
      throw error
    }
  }

  const authRefreshToken = async (refreshToken: string) => {
    try {
      const response = await fetch(`${AUTH_PATH}/auth/token/refresh`, {
        method: 'POST',
        body: JSON.stringify({ refresh_token: refreshToken }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json()
        if (result.data) {
          return result.data;
        } else {
          throw new Error('Invalid response received.')
        }
      } else {
        throw new Error('Login request failed.')
      }
    } catch (error) {
      throw error
    }
  }

  const checkLoggedIn = async () => {
    setIsAuthenticating(true)
    const session: string | null = localStorage.getItem(AUTH_LOCALSTORAGE_KEY)
    
    if (session) {
      const sessionObj = JSON.parse(session)
      const { token: refreshToken } = sessionObj

      try {
        const { access_token, refresh_token } = await authRefreshToken(refreshToken)
        if (access_token && refresh_token) {
          handleAuthentication(access_token, refresh_token)
        } else {
          throw Error('Invalid access or refresh token')
        }
      } catch(error) {
        console.error(error)
        setError('Your login has expired. Please login again.')
        logoutSuccess()
      }
    }

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
