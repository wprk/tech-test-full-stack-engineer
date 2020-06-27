import React from 'react'
import NumberFormat from 'react-number-format'

import Card from '../Card'
import CardSection from '../CardSection'
import HeaderSection from './HeaderSection'
import DescriptionSection from './DescriptionSection'
import DetailsSection from './DetailsSection'
import Button from '../../Button'
import JobResource from '../../../resources/JobResource'

interface IProps {
  job: JobResource
}

const NewJobCard = ({ job }: IProps) => (
  <Card>
    <HeaderSection job={job} />
    <DetailsSection job={job} />
    <DescriptionSection description={job.description} />
    <CardSection>
      <div className="flex items-center space-x-4">
        <Button text="Accept" type="button" onClick={() => {}} action="primary" size="large" />
        <Button text="Decline" type="button" onClick={() => {}} action="secondary" size="large" />
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

export default NewJobCard
