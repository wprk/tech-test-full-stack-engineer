import React from 'react'

import Card from '../Card'
import CardSection from '../CardSection'
import DetailsSection from './DetailsSection'
import HeaderSection from './HeaderSection'
import DescriptionSection from './DescriptionSection'
import JobResource from '../../../resources/JobResource'

interface IProps {
  job: JobResource
}

const AcceptedJobCard = ({ job }: IProps) => (
  <Card>
    <HeaderSection job={job} />
    <DetailsSection job={job} />
    <CardSection separator={false} className="-mb-4">
      <dl>
        <div className="flex items-center space-x-6 text-gray-600">
          <div className="flex items-center space-x-1">
            <dt>
              <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
              <span className="sr-only">Phone number</span>
            </dt>
            <dd>
              <span className="text-hipages-orange">{ job.contact_phone }</span>
            </dd>
          </div>
          <div className="flex items-center space-x-1">
            <dt>
              <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <span className="sr-only">Email address</span>
            </dt>
            <dd>
              <span className="text-hipages-orange">{ job.contact_email }</span>
            </dd>
          </div>
        </div>
      </dl>
    </CardSection>
    <DescriptionSection description={job.description} />
  </Card>
)

export default AcceptedJobCard
