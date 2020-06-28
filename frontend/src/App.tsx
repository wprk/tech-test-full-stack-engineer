import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import Routes from './Routes'
import AuthProvider from './providers/AuthProvider'

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes />
      </Router>
    </AuthProvider>
  )
}

export default App
