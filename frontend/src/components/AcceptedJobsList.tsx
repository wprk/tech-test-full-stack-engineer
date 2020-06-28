import React from 'react'
import { useResource } from 'rest-hooks'

import AcceptedJobCard from './Card/Job/AcceptedJobCard'
import JobsList from './JobsList'
import JobResource, { JobStatus } from '../resources/JobResource'

const AcceptedJobsList = () => {
  const { data: jobs } = useResource(JobResource.listShape(), {
    status: JobStatus.ACCEPTED,
    limit: 50,
    page: 1,
  });

  return <JobsList jobs={jobs} component={AcceptedJobCard} />
}

export default AcceptedJobsList
