import React from 'react'

import Loading from './Loading'

const FullScreenLoading = () => (
  <div className="flex h-screen w-screen items-center justify-center">
    <Loading size={50} />
  </div>
)

export default FullScreenLoading
