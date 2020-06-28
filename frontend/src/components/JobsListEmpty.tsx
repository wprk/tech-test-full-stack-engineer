import React from 'react'

import Card from './Card/Card'

const JobsListEmpty = ({ children }: any) => (
  <Card>
    <div className="p-4 text-gray-500 text-center space-x-1">
      <span>No jobs found.</span>
    </div>
  </Card>
)

export default JobsListEmpty
