import React from 'react'
import { useResource } from 'rest-hooks'

import NewJobCard from './Card/Job/NewJobCard'
import JobsList from './JobsList'
import JobResource, { JobStatus } from '../resources/JobResource'

const NewJobsList = () => {
  const { data: jobs } = useResource(JobResource.listShape(), { status: JobStatus.NEW });

  return <JobsList jobs={jobs} component={NewJobCard} />
}

export default NewJobsList
