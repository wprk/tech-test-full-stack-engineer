import React from 'react'
import classNames from 'classnames'

const Tab = ({ active, children, name, setActive }: any) => (
  <button
    className="flex-1 bg-white focus:outline-none group"
    role="tab"
    aria-selected={active}
    aria-controls="status-tabs"
  >
    <div
      className={classNames([
        'flex-1 text-center cursor-pointer border-b-3 py-4 mx-px',
        {'border-transparent group-focus:border-hipages-orange': !active},
        {'border-hipages-orange': active},
      ])}
      onClick={() => setActive(name)}
    >
      { children }
    </div>
  </button>
)

export default Tab
