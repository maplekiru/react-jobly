import React from 'react';
import JobCard from './JobCard';


/**
 * JobCardList
 * 
 * State: TBD
 * Props: search-term(optional) ** or company handle
 * 
 * {CompanyDetail, JobList} --> JobCardList --> JobCard
 */
function JobCardList() {
  return (
    <div>
      JobCardList
      <JobCard JobInfo={{ title: 'job1' }} />
    </div>
  )
}
export default JobCardList;