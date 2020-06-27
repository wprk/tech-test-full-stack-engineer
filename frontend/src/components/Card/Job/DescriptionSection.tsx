import React from 'react'

import CardSection from '../CardSection'

interface IProps {
  description: string
}

const DescriptionSection = ({ description }: IProps) => (
  <CardSection>
    <dl>
      <dt className="sr-only">
        Job description
      </dt>
      <dd>
        <p className="text-sm leading-6 text-gray-600 truncate-4-lines hover:truncate-none-lines">{ description }</p>
      </dd>
    </dl>
  </CardSection>
)

export default DescriptionSection
