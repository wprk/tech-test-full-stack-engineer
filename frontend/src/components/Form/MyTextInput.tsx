import React from 'react'
import { useField, FieldConfig } from 'formik'
import MyFormError from './MyFormError';

interface IProps {
  label: string,
}

const MyTextInput = ({
  label,
  ...props
}: IProps & FieldConfig & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label
        className="block text-sm font-medium leading-5 text-gray-700"
        htmlFor={props.name}
      >
        {label}
      </label>
      <div className="mt-1 rounded-md shadow-sm">
        <input
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          {...field}
          {...props}
        />
      </div>
      {meta.touched && meta.error ? (
        <MyFormError id={ `${props.name}-error` } error={meta.error} />
      ) : null}
    </>
  )
}

export default MyTextInput
