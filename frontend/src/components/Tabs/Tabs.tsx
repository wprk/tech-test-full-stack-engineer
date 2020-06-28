import React from 'react'

const Tabs = ({ children }: any) => (
  <div className="w-full shadow-md rounded flex bg-gray-100" id="status-tabs">
    { children }
  </div>
)

export default Tabs
