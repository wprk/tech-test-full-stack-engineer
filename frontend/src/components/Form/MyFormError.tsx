import React from 'react'

interface IProps {
  error: string | null
  id?: string
}

const MyFormError = ({ error, ...props }: IProps) => (
  <p className="mt-2 text-sm text-red-600" {...props}>
    {error}
  </p>
)

export default MyFormError
