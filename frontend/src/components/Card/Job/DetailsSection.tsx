import React from 'react'
import NumberFormat from 'react-number-format'

import CardSection from '../CardSection'
import JobResource, { JobStatus } from '../../../resources/JobResource'

interface IProps {
  job: JobResource
}

const DetailsSection = ({ job }: IProps) => (
  <CardSection>
    <dl>
      <div className="flex flex-wrap items-center -mb-4">
        <div className="flex items-center space-x-1 mr-6 mb-4">
          <dt>
            <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <span className="sr-only">Postcode</span>
          </dt>
          <dd>
            <span className="text-gray-600">{ `${job.suburb?.name} ${job.suburb?.postcode}` }</span>
          </dd>
        </div>
        <div className="flex items-center space-x-1 mr-6 mb-4">
          <dt>
            <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            <span className="sr-only">Job category</span>
          </dt>
          <dd>
            <span className="text-gray-600">{ job.category?.name }</span>
          </dd>
        </div>
        <div className="flex items-center space-x-1 mr-6 mb-4">
          <dt>
            <span className="text-gray-600">Job ID:</span>
          </dt>
          <dd>
            <span className="text-gray-600">{ job.id }</span>
          </dd>
        </div>
        {job.status === JobStatus.ACCEPTED && (
          <div className="flex items-center space-x-1 mr-6 mb-4">
            <dd>
              <span className="text-gray-600">
                <NumberFormat decimalScale={2} displayType="text" fixedDecimalScale={true} prefix={'$'} thousandSeparator={true} value={job.price} />
              </span>
            </dd>
            <dt>
              <span className="text-gray-600">Lead Invitation</span>
            </dt>
          </div>
        )}
      </div>
    </dl>
  </CardSection>
)

export default DetailsSection
