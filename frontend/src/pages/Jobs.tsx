import React, { Suspense, useState } from 'react'
import { NetworkErrorBoundary } from 'rest-hooks';
import classNames from 'classnames'

import AcceptedJobsList from '../components/AcceptedJobsList'
import { JobStatus } from '../resources/JobResource'
import JobsListError from '../components/JobsListError';
import JobsListLoading from '../components/JobsListLoading';
import NewJobsList from '../components/NewJobsList'
import Tabs from '../components/Tabs/Tabs';
import Tab from '../components/Tabs/Tab';

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
        <Suspense fallback={<JobsListLoading />}>
          <NetworkErrorBoundary fallbackComponent={JobsListError}>
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
