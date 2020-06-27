import React from 'react'
import { Switch, Route } from 'react-router-dom'

import ProtectedRoute from './ProtectedRoute'
import Jobs from './pages/Jobs'
import Login from './pages/Login'
import NotFound from './pages/NotFound'

const Routes = () => (
  <Switch>
    <ProtectedRoute exact path="/" component={Jobs} />
    
    <Route exact path="/login" component={Login} />
    <Route path="*" component={NotFound} />
  </Switch>
)

export default Routes