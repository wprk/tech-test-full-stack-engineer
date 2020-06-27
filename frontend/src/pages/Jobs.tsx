import React, { Suspense, useState } from 'react'
import { NetworkErrorBoundary } from 'rest-hooks';
import classNames from 'classnames'

import NewJobsList from '../components/NewJobsList'
import AcceptedJobsList from '../components/AcceptedJobsList'
import { JobStatus } from '../resources/JobResource'
import Loading from '../components/Loading';

const Tabs = ({ children }: any) => (
  <div className="w-full shadow-md rounded flex bg-gray-100">
    { children }
  </div>
)

const Tab = ({ active, children, name, setActive }: any) => (
  <div className="flex-1 ">
    <div
      className={classNames([
        'flex-1 text-center cursor-pointer border-b-3 py-4 bg-white mx-px',
        {'border-hipages-orange': active},
        {'border-transparent': !active}
      ])}
      onClick={() => setActive(name)}
    >
      { children }
    </div>
  </div>
)

const Jobs = () => {
  const [activeTab, setActiveTab] = useState<JobStatus>(JobStatus.NEW)

  return (
    <div className="w-full h-full min-h-screen bg-gray-300 flex justify-center">
      <div className="flex-1 max-w-3xl p-4 space-y-4">
        <Tabs>
          <React.Fragment>
            <Tab active={activeTab === JobStatus.NEW} setActive={setActiveTab} name={JobStatus.NEW}>
              <span className={classNames([
                {'font-bold': activeTab === JobStatus.NEW}
              ])}>
                Invited
              </span>
            </Tab>
            <Tab active={activeTab === JobStatus.ACCEPTED} setActive={setActiveTab} name={JobStatus.ACCEPTED}>
              <span className={classNames([
                {'font-bold': activeTab === JobStatus.ACCEPTED}
              ])}>
                Accepted
              </span>
            </Tab>
          </React.Fragment>
        </Tabs>
        <Suspense fallback={<Loading />}>
          <NetworkErrorBoundary>
            {activeTab === JobStatus.NEW && (
              <NewJobsList />
            )}
            {activeTab === JobStatus.ACCEPTED && (
              <AcceptedJobsList />
            )}
          </NetworkErrorBoundary>
        </Suspense>
      </div>
    </div>
  );
}

export default Jobs
