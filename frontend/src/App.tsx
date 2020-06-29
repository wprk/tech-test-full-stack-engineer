import React, { Suspense } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import Routes from './Routes'
import AuthProvider from './providers/AuthProvider'
import FullScreenLoading from './components/FullScreenLoading'
import { NetworkErrorBoundary } from 'rest-hooks'

const App = () => {
  return (
    <Suspense fallback={<FullScreenLoading />}>
      <NetworkErrorBoundary>
        <AuthProvider>
          <Router>
            <Routes />
          </Router>
        </AuthProvider>
      </NetworkErrorBoundary>
    </Suspense>
  )
}

export default App
