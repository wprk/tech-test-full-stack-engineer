import React from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import Loading from './Loading'

type IProps = {
  action?: 'primary' | 'secondary'
  className?: string
  disabled?: boolean
  link?: boolean
  loading?: boolean
  onClick?: () => void
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'
  text: string
  to?: string
  type?: 'button' | 'submit'
  width?: 'default' | 'full'
}

const Button = ({
  action = 'primary',
  className = '',
  disabled = false,
  link = false,
  loading = false,
  onClick,
  size = 'large',
  text,
  to = '',
  type = 'button',
  width = 'default'
}: IProps) => {
  if ((!onClick && !link && type !== 'submit') || (!onClick && link && !to && type !== 'submit')) {
    console.error('Button missing onClick property or valid link property and to property')
  }

  const containerClasses = classNames([
    {'inline-flex shadow-sm': className.length === 0 },
    {[className]: className.length > 0 },
  ])

  const classes = classNames([
    'font-medium focus:outline-none transition ease-in-out duration-150',
    {'px-3 py-1.5 text-xs leading-4': size === 'xsmall'},
    {'px-4 py-2 text-sm leading-4 sm:text-xs': size === 'small'},
    {'px-5 py-2 text-sm leading-5 sm:text-xs sm:leading-4': size === 'medium'},
    {'px-6 py-2 text-base leading-6 sm:text-sm sm:leading-5': size === 'large'},
    {'px-8 py-3 text-base leading-6 sm:text-sm sm:leading-5': size === 'xlarge'},
    {'inline-flex items-center': width === 'default'},
    {'inline-flex justify-center w-full': width === 'full'},
    {'text-white bg-hipages-primary-btn border-b-3 border-hipages-primary-btn-hover hover:bg-hipages-primary-btn-hover focus:bg-hipages-primary-btn-focus active:bg-hipages-primary-btn-active focus:shadow-outline-blue': action === 'primary'},
    {'text-black bg-hipages-secondary-btn border-b-3 border-hipages-secondary-btn-hover hover:bg-hipages-secondary-btn-hover focus:bg-hipages-secondary-btn-focus active:bg-hipages-secondary-btn-active focus:shadow-outline-blue': action === 'secondary'},
  ])

  const loadingColor = action === 'secondary' ? '#000' : '#fff'

  return (
    <div className={containerClasses}>
      {link && !onClick && (
        <Link
          className={classes}
          to={to}
        >
          { text }
        </Link>
      )}
      {!link && (
        <button
          className={classes}
          disabled={disabled}
          onClick={onClick}
          type={type}
        >
          {!loading && text}
          {loading && (
            <Loading color={loadingColor} size={14} />
          )}
        </button>
      )}
    </div>
  )
}

export default Button