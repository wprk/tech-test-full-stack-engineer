import React, { useEffect, useState } from 'react'
import moment from 'moment'

import NewJobCard from './Card/Job/NewJobCard'
import JobsList from './JobsList'
import Job, { JobStatus } from '../interfaces/Job'

const NewJobsList = () => {
  const [jobs, setJobs] = useState<Job[]>([])

  useEffect(() => {
    setJobs([
      {
        "id": 1,
        "status": JobStatus.NEW,
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
      {
          "id": 2,
          "status": JobStatus.NEW,
          "suburb_id": 2,
          "category_id": 2,
          "contact_name": "Darth Vader",
          "contact_email": "darth@mailinator.com",
          "contact_phone": "0422223333",
          "price": 30.00,
          "description": "Praesent elit dui, blandit eget nisl sed, ornare pharetra urna. In cursus auctor tellus. Quisque ligula metus, viverra nec nibh ut, sagittis luctus tellus. Nulla egestas nibh ut diam vehicula, ut auctor lectus pharetra. Aliquam condimentum, erat eget vehicula eleifend, nulla risus consequat augue, quis convallis mi diam et dui.",
          "created_at": moment("2020-06-27T08:54:50.000Z"),
          "updated_at": null
      },
      {
          "id": 3,
          "status": JobStatus.NEW,
          "suburb_id": 3,
          "category_id": 3,
          "contact_name": "Han Solo",
          "contact_email": "han@mailinator.com",
          "contact_phone": "0498765432",
          "price": 45.00,
          "description": "Aliquam posuere est sit amet libero egestas tempus. Donec ut efficitur sapien. Sed molestie nec lacus malesuada suscipit. Aliquam suscipit nibh at posuere tempor. Etiam a sollicitudin felis. In et enim leo. Morbi vel imperdiet purus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere auctor elit, id venenatis.",
          "created_at": moment("2020-06-27T08:54:50.000Z"),
          "updated_at": null
      },
      {
          "id": 4,
          "status": JobStatus.NEW,
          "suburb_id": 4,
          "category_id": 4,
          "contact_name": "Kylo Ren",
          "contact_email": "kylo@mailinator.com",
          "contact_phone": "0488770066",
          "price": 15.00,
          "description": "Proin semper consectetur mauris id commodo. In accumsan est ligula, id posuere libero placerat ac. Nunc non volutpat sem. Mauris gravida dictum eleifend. Praesent quis mattis arcu, rutrum sagittis diam. Nullam tempus sagittis diam, vel viverra nunc ultricies non. Sed at orci sem. Phasellus eget arcu hendrerit, congue metus ut, mollis tellus. Quisque gravida metus ut libero porta, sit amet rutrum odio porta. Fusce interdum est sed quam venenatis dictum. Integer ultrices est in odio semper dictum. Proin nec urna vel quam finibus maximus.\n\nSed accumsan urna vitae libero luctus volutpat. Nulla eu sodales enim, vitae blandit ligula. Suspendisse at magna pellentesque, rhoncus orci quis, consequat diam. Donec pulvinar accumsan erat, quis hendrerit est ultricies vel. Vivamus felis justo, vulputate non urna sed, finibus semper ipsum. Cras mattis, est vel posuere mattis, turpis augue elementum massa, vitae accumsan nibh nisl nec lectus. Maecenas porta sagittis erat at consequat. Suspendisse fermentum rutrum bibendum. Donec tempor mollis massa vel egestas.\n\nMorbi rutrum felis lacinia eros tincidunt scelerisque. Morbi aliquam porttitor sapien. Phasellus eu odio ac neque faucibus suscipit in at lectus. Maecenas et blandit arcu. Nullam sed sem neque. Nulla sit amet tristique nisl. Ut et pretium velit. Fusce consequat tincidunt fringilla. Nunc gravida libero sit amet augue viverra, a imperdiet odio dictum. Sed iaculis, metus vel rutrum convallis, quam ex commodo nibh, eget ultrices nisi eros eu massa. Ut iaculis maximus ligula, sed efficitur mauris bibendum sagittis. Curabitur et dolor mi. Proin lorem urna, porttitor quis lacus pharetra, ornare porta nulla. Sed ultricies feugiat nibh, et semper tellus aliquet sit amet. Cras faucibus scelerisque nisi, at vestibulum massa pharetra et.\n\n",
          "created_at": moment("2020-06-27T08:54:50.000Z"),
          "updated_at": null
      },
      {
          "id": 5,
          "status": JobStatus.NEW,
          "suburb_id": 5,
          "category_id": 5,
          "contact_name": "Lando Calrissian",
          "contact_email": "lando@mailinator.com",
          "contact_phone": "0433335555",
          "price": 62.00,
          "description": "Quisque blandit erat id mi tincidunt porta. Vivamus eleifend sagittis neque id maximus. Etiam molestie, massa ut tempus fermentum, augue nisi pulvinar nunc, id malesuada ipsum ipsum nec odio. Etiam et nisl facilisis, egestas massa eget, sagittis sapien. Curabitur eget consequat diam. Proin auctor rhoncus est, vitae imperdiet sem mollis.",
          "created_at": moment("2020-06-27T08:54:50.000Z"),
          "updated_at": null
      }
  ])
  }, [])

  return <JobsList jobs={jobs} component={NewJobCard} />
}

export default NewJobsList
