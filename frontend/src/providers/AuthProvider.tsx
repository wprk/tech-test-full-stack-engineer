import React, { useEffect, useState, ReactNode } from 'react'
import jwtDecoder from 'jwt-decode'

export const AUTH_LOCALSTORAGE_KEY = 'auth'
const DUMMY_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwiZXhwaXJ5IjoxNjA5NDU5MTk5fQ.Ay9kGt_-fbSGLx3U-cxpKgLOGIDkXfJXK2oIXVHQcoA'

interface Auth {
  expiry: number | null,
  token: string | null,
  userId: string | null,
}

export interface AuthContextType extends Auth {
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
  const [authenticating, setAuthenticating] = useState<boolean>(DEFAULT_AUTHCONTEXT.isAuthenticating)
  const [auth, setAuth] = useState<Auth>(DEFAULT_AUTH)

  useEffect(() => {
    // Check if currently logged in
    const session: string | null = localStorage.getItem(AUTH_LOCALSTORAGE_KEY)
    
    if (session) {
      const sessionObj = JSON.parse(session)
      const { expiry, token, userId } = sessionObj

      if (expiry > Math.floor(new Date().getTime() / 1000)) {
        loginSuccess(token, userId, expiry)
      } else {
        logoutSuccess()
      }
    } else {
      setAuthenticating(false)
    }
  }, [])

  const onLogin = async (email: string, password: string) => {
    setAuthenticating(true)

    // Would get a token here from the server and pass it to handleAuthentication method
    handleAuthentication(DUMMY_TOKEN)
  }

  const onLoginWithFacebook = async () => {
    setAuthenticating(true)

    // Would get a token here from the provider and pass it to handleAuthentication method
    handleAuthentication(DUMMY_TOKEN)
  }

  const onLoginWithTwitter = async () => {
    setAuthenticating(true)

    // Would get a token here from the provider and pass it to handleAuthentication method
    handleAuthentication(DUMMY_TOKEN)
  }

  const onLoginWithGitHub = async () => {
    setAuthenticating(true)

    // Would get a token here from the provider and pass it to handleAuthentication method
    handleAuthentication(DUMMY_TOKEN)
  }

  const onLogout = async () => {
    setAuthenticating(true)

    logoutSuccess()
  }

  const handleAuthentication = (token: string) => {
    setTimeout(() => {
      const decodedToken: any = jwtDecoder(DUMMY_TOKEN)
      const { userId, expiry } = decodedToken
  
      localStorage.setItem(
        AUTH_LOCALSTORAGE_KEY,
        JSON.stringify({ expiry, token, userId })
      )
  
      loginSuccess(token, userId, expiry)
    }, 500)
  }

  const loginSuccess = async (token: string, userId: string, expiry: number) => {
    setAuth({ expiry, token, userId })
    setAuthenticating(false)
  }

  const logoutSuccess = async () => {
    localStorage.removeItem(AUTH_LOCALSTORAGE_KEY)
    setAuth(DEFAULT_AUTH)
    setAuthenticating(false)
  }

  return (
    <AuthContext.Provider
      value={{
        ...auth,
        isAuthenticating: authenticating,
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
