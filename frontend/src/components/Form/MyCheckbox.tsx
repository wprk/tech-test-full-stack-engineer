import React, { ReactNode } from 'react'
import { useField, FieldConfig } from 'formik'
import MyFormError from './MyFormError';

interface IProps {
  children: ReactNode,
}

const MyCheckbox = ({ children, ...props }: IProps & FieldConfig) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' });

  return (
    <>
      <div className="flex items-center">
        <input
          className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
          type="checkbox"
          {...field}
          {...props}
        />
        <label
          className="ml-2 block text-sm leading-5 text-gray-900"
          htmlFor={props.name}
        >
          {children}
        </label>
      </div>
      {meta.touched && meta.error ? (
        <MyFormError id={ `${props.name}-error` } error={meta.error} />
      ) : null}
    </>
  );
};

export default MyCheckbox
