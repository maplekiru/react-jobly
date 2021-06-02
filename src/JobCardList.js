import React from 'react';
import JobCard from './JobCard';
import './JobCardList.css'

/**
 * JobCardList
 * 
 * State: None
 * Props: 
 * - jobs: [{ id, title, salary, equity }, ...]
 * 
 * 
 * {CompanyDetail, JobList} --> JobCardList --> JobCard
 */
function JobCardList({jobs}) {
  return (
    <div className='JobCardList'>
      {jobs.map(job => 
      <JobCard key={job.id} job={job} />)}
    </div>
  )
}
export default JobCardList;