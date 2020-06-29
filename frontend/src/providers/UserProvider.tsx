import React, { ReactNode } from 'react'
import { useResource } from 'rest-hooks'
import UserResource from '../resources/UserResource'

export interface UserContextType {
  user: UserResource | null
}

const DEFAULT_USERCONTEXT: UserContextType = {
  user: null,
}

export const UserContext = React.createContext(DEFAULT_USERCONTEXT)

interface IProps {
  children: ReactNode
}

const UserProvider = ({ children }: IProps) => {
  const user = useResource(UserResource.currentShape(), {});

  return (
    <UserContext.Provider
      value={{
        user: user ? user : null
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
