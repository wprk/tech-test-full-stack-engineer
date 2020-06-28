import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'

import FullScreenLoading from './components/FullScreenLoading'
import { AuthContext } from './providers/AuthProvider'

const ProtectedRoute = ({ component: RouteComponent, ...rest }: any) => {
  const { isAuthenticated, isAuthenticating } = useContext(AuthContext)
 
  const showProtectedRoute = () => (
    <Route
      {...rest}
      render={(routeProps: any) => (
        <RouteComponent {...routeProps} />
      )}
    />
  )

  if (!isAuthenticating) {
    if (isAuthenticated) {
      return showProtectedRoute()
    } else {
      return <Redirect to={{ pathname: '/login', state: { referrer: window.location.href } }} />
    }
  }

  return <FullScreenLoading />
}

export default ProtectedRoute
