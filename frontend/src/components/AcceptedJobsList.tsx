import React, { useEffect, useState } from 'react'
import moment from 'moment'

import AcceptedJobCard from './Card/Job/AcceptedJobCard'
import JobsList from './JobsList'
import Job, { JobStatus } from '../interfaces/Job'

const AcceptedJobsList = () => {
  const [jobs, setJobs] = useState<Job[]>([])

  useEffect(() => {
    setJobs([
      {
        "id": 1,
        "status": JobStatus.ACCEPTED,
        "suburb_id": 1,
        "category_id": 1,
        "contact_name": "Luke Skywalker",
        "contact_email": "luke@mailinator.com",
        "contact_phone": "0412345678",
        "price": 20.00,
        "description": "Integer aliquam pulvinar odio et convallis. Integer id tristique ex. Aenean scelerisque massa vel est sollicitudin vulputate. Suspendisse quis ex eu ligula elementum suscipit nec a est. Aliquam a gravida diam. Donec placerat magna posuere massa maximus vehicula. Cras nisl ipsum, fermentum nec odio in, ultricies dapibus risus. Vivamus neque.",
        "created_at": moment("2020-06-27T08:54:50.000Z"),
        "updated_at": null
      },
  ])
  }, [])

  return <JobsList jobs={jobs} component={AcceptedJobCard} />
}

export default AcceptedJobsList
