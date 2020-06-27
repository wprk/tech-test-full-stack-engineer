import React from 'react'

import Job from '../../../interfaces/Job'
import CardSection from '../CardSection'

interface IProps {
  job: Job
}

const HeaderSection = ({ job }: IProps) => (
  <CardSection>
    <dl>
      <div className="flex items-center space-x-4">
        <div>
          <dt className="sr-only">
            Contact Avatar
          </dt>
          <dd>
            <img className="w-12 h-12 rounded-full" src={`https://i.pravatar.cc/150?u=${job.contact_email}`} alt={`${job.contact_name} avatar`} />
          </dd>
        </div>
        <div className="">
          <dt className="sr-only">
            Contact Name
          </dt>
          <dd>
            <span className="text-gray-600 font-semibold">
              { job.contact_name }
            </span>
          </dd>
          <dt className="sr-only">
            Job listed date
          </dt>
          <dd>
            <span className="text-gray-600 text-sm">
              <time dateTime={job.created_at.unix.toString()}>{ job.created_at.format('MMMM D Y @ h:mm a') }</time>
            </span>
          </dd>
        </div>
      </div>
      
    </dl>
  </CardSection>
)

export default HeaderSection
