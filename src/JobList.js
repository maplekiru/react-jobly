import React from 'react';
import JobCardList from './JobCardList';
// import SearchForm from './SearchForm'

/**
 * JobList
 * 
 * State: TBD
 * Props: None
 * 
 * Routes --> JobList --> {SearchForm, JobCardList}
 */
function JobList() {
  return (
    <div>
      JobList: <JobCardList/>
    </div>
  )
}
export default JobList;