import React, { useEffect, useState } from 'react';
import JobCardList from './JobCardList';
import JoblyAPI from './JoblyAPI'
import SearchForm from './SearchForm'
import './JobList.css'

/**
 * JobList
 * 
 * State: TBD
 * Props: handleSearch
 * 
 * Routes --> JobList --> {SearchForm, JobCardList}
 */
function JobList() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState(null);

  function handleSearch(search) {
    setSearchTerm(search);
  }

  useEffect(function getJobs(){
    async function jobsAPI() {
      let jobList = await JoblyAPI.getJobs(searchTerm);
      setJobs(jobList);
    }
    jobsAPI()
  },[searchTerm])

  return (
    <div className='JobList'>
      <SearchForm handleSearch={handleSearch}/>
      <JobCardList jobs={jobs} />
    </div>
  )
}
export default JobList;