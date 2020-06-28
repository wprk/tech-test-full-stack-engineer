import React from 'react'

import CardSection from '../CardSection'
import JobResource from '../../../resources/JobResource'

interface IProps {
  job: JobResource
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
            <div className="w-12 h-12 rounded-full bg-hipages-avatar-placeholder flex items-center justify-center">
              <div className="text-white text-xl font-semibold">{ job.firstInitial }</div>
            </div>
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
              <time dateTime={job.createdAt.unix.toString()}>{ job.createdAt.format('MMMM D Y @ h:mm a') }</time>
            </span>
          </dd>
        </div>
      </div>
      
    </dl>
  </CardSection>
)

export default HeaderSection
