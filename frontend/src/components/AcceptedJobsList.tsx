import React, { useState } from 'react'
import { useResource } from 'rest-hooks'

import AcceptedJobCard from './Card/Job/AcceptedJobCard'
import JobsList from './JobsList'
import { useInvalidateOnUnmount } from '../helpers/useInvalidateOnUnmount'
import JobResource, { JobStatus } from '../resources/JobResource'

const AcceptedJobsList = () => {
  const [queryParams] = useState({
    status: JobStatus.ACCEPTED,
    limit: 10,
    page: 1,
    with: [ 'category', 'suburb' ]
  })
  const { data: jobs } = useResource(JobResource.listShape(), queryParams);
  useInvalidateOnUnmount(JobResource.listShape(), queryParams);

  return <JobsList jobs={jobs} component={AcceptedJobCard} />
}

export default AcceptedJobsList
