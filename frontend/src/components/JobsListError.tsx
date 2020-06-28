import React from 'react'

import Card from './Card/Card'
import { NetworkError } from 'rest-hooks/lib/react-integration'

interface IProps {
  error: NetworkError
}

const JobsListError = ({ error }: IProps) => {
  console.log({ status: error.status });
  console.log({ response: error.response });
  console.log({ statusText: error.response?.statusText });

  return (
    <Card>
      <div className="p-4 text-red-500 text-center">
        {error.status}
        {error.response && error.response.statusText}
        {!error.response && (
          <span>Unable to fetch jobs list at this time. Please try again later.</span>
        )}
      </div>
    </Card>
  )
}

export default JobsListError