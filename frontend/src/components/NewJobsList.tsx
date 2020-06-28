import React from 'react'
import { useResource } from 'rest-hooks'

import NewJobCard from './Card/Job/NewJobCard'
import JobsList from './JobsList'
import { useInvalidateOnUnmount } from '../helpers/useInvalidateOnUnmount'
import JobResource, { JobStatus } from '../resources/JobResource'

const NewJobsList = () => {
  const queryParams = {
    status: JobStatus.NEW,
    limit: 50,
    page: 1,
  }
  const { data: jobs } = useResource(JobResource.listShape(), queryParams);
  useInvalidateOnUnmount(JobResource.listShape(), queryParams);

  return <JobsList jobs={jobs} component={NewJobCard} queryParams={queryParams} />
}

export default NewJobsList
