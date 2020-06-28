import React, { useContext } from 'react'

import Button from './Button'
import { AuthContext } from '../providers/AuthProvider'

const LogoutBtn = () => {
  const { isAuthenticated, onLogout } = useContext(AuthContext)

  if (isAuthenticated) {
    return (
      <div className="fixed bottom-5 right-5">
        <Button
          onClick={() => onLogout()}
          text="Logout"
        />
      </div>
    )
  }

  return null
}

export default LogoutBtn
