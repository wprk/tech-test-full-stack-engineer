import React from 'react'

const Section = ({ children }: any) => (
  <div className="p-4 pb-0">
    { children }
  </div>
)

const SectionWithSeparator = ({ children }: any) => (
  <div className="border-b border-gray-200 pb-4">
    <Section>{ children }</Section>
  </div>
)

const CardSection = ({ separator = true, children, className = null }: any) => {
  if (separator) {
    return <SectionWithSeparator>{ children }</SectionWithSeparator>
  }
  
  return <Section>{ children }</Section>
}

export default CardSection
