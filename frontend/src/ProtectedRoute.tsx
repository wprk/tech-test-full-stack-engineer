import React, { useState } from 'react'
import { Route, Redirect } from 'react-router-dom'
import FullScreenLoading from './components/FullScreenLoading'

const ProtectedRoute = ({ component: RouteComponent, ...rest }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  const [isAuthenticating, setIsAuthenticating] = useState(false)
 
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
