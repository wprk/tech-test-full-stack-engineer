import React from 'react'

const JobsList = ({ component: JobComponent, jobs = [] }: any) => (
  <div className="space-y-4">
    {jobs.map((job: any) => <JobComponent key={job.id} job={job} />)}
  </div>
)

export default JobsList
