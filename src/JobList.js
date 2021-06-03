import React, { useEffect, useState } from 'react';
import JobCardList from './JobCardList';
import JoblyAPI from './JoblyAPI'
import SearchForm from './SearchForm'
import './JobList.css'
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert'


/**
 * JobList
 * 
 * State: 
 * - jobs: [{ id, title, salary, equity }, ...]
 * - searchTerm: ''
 * Props: None
 * 
 * Routes --> JobList --> {SearchForm, JobCardList}
 */
function JobList() {
  const [jobs, setJobs] = useState([]);
  const [isApiError, setIsApiError] = useState(false) 
  const [searchTerm, setSearchTerm] = useState(null);

  function handleSearch(search) {
    setSearchTerm(search);
  }

  useEffect(function getJobs(){
    async function fetchJobsAPI() {
      try {
      const jobList = await JoblyAPI.getJobs(searchTerm);
      setJobs(jobList);
      } catch {
        setIsApiError(true);
      }
    }
    fetchJobsAPI()
  },[searchTerm])

  if (isApiError) return <Alert variant='danger'> API Error </Alert>;

  return (
    <Container className='JobList'>
      <SearchForm handleSearch={handleSearch}/>
      <JobCardList jobs={jobs} />
    </Container>
  )
}
export default JobList;