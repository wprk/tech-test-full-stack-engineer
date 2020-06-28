import React, { useCallback } from 'react'
import NumberFormat from 'react-number-format'
import { useFetcher } from 'rest-hooks';

import Card from '../Card'
import CardSection from '../CardSection'
import HeaderSection from './HeaderSection'
import DescriptionSection from './DescriptionSection'
import DetailsSection from './DetailsSection'
import Button from '../../Button'
import JobResource, { JobStatus } from '../../../resources/JobResource'

interface IProps {
  job: JobResource
  queryParams: object
}

const NewJobCard = ({ job, queryParams }: IProps) => {
  const update = useFetcher(JobResource.partialUpdateShape());

  const statusChangeHandler = useCallback((
    job: JobResource,
    status: JobStatus
  ) => {
    update({ id: job.id }, { status }, [
      [
        JobResource.listShape(),
        queryParams,
        (expectedData: any, existingData: any | undefined) => {
          const jobIds = existingData.data || [];
          return {
            ...existingData,
            data: jobIds.filter((jobId: any) => jobId !== expectedData.data)
          }
        }
      ],
    ])
  }, [queryParams, update]);
  
  return (
    <Card>
      <HeaderSection job={job} />
      <DetailsSection job={job} />
      <DescriptionSection description={job.description} />
      <CardSection>
        <div className="flex items-center space-x-4">
          <Button text="Accept" type="button" onClick={() => statusChangeHandler(job, JobStatus.ACCEPTED)} action="primary" size="large" />
          <Button text="Decline" type="button" onClick={() => statusChangeHandler(job, JobStatus.DECLINED)} action="secondary" size="large" />
          <div className="flex items-center space-x-1">
            <span className="text-gray-600 font-semibold">
              <NumberFormat decimalScale={2} displayType="text" fixedDecimalScale={true} prefix={'$'} thousandSeparator={true} value={job.price} />
            </span>
            <span className="text-gray-600">Lead Invitation</span>
          </div>
        </div>
      </CardSection>
    </Card>
  )
}

export default NewJobCard
