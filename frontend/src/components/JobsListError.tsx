import React from 'react'

import Card from './Card/Card'
import { NetworkError } from 'rest-hooks/lib/react-integration'

interface IProps {
  error: NetworkError
}

const JobsListError = ({ error }: IProps) => (
  <Card>
    <div className="p-4 text-sm text-red-500 text-center space-x-1">
      <span>Error {error.status}:</span>
      {error.response && error.response.statusText}
      {!error.response && (
        <span>Unable to fetch jobs at this time. Please try again later.</span>
      )}
    </div>
  </Card>
)

export default JobsListError