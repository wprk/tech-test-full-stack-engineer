import React from 'react'
import JobsListEmpty from './JobsListEmpty'

const JobsList = ({ component: JobComponent, jobs = [], queryParams }: any) => (
  <div className="space-y-4">
    {jobs.length > 0 && jobs.map((job: any) => <JobComponent key={job.id} job={job} queryParams={queryParams} />)}
    {jobs.length === 0 && (
      <JobsListEmpty />
    )}
  </div>
)

export default JobsList
