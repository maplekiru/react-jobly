import React, { useEffect, useState, useContext } from 'react';
import JobCardList from './JobCardList';
import JoblyAPI from './JoblyAPI'
import SearchForm from './SearchForm'
import './JobList.css'
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert'
import CurrentUserContext from './CurrentUserContext'


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
  const [apiError, setApiError] = useState(false) 
  const [searchTerm, setSearchTerm] = useState(null);

  const currentUser = useContext(CurrentUserContext)

  function handleSearch(search) {
    setSearchTerm(search);
  }

  useEffect(function getJobs(){
    async function fetchJobsAPI() {
      try {
      const jobList = await JoblyAPI.getJobs(searchTerm);
      setJobs(jobList);
      } catch {
        setApiError(true);
      }
    }
    fetchJobsAPI()
  },[searchTerm])
  
  if (!currentUser) return <Alert variant='warning'> Please login in to view page </Alert>
  if (apiError) return <Alert variant='danger'> {apiError} </Alert>;

  return (
    <Container className='JobList'>
      <SearchForm handleSearch={handleSearch}/>
      <JobCardList jobs={jobs} />
    </Container>
  )
}
export default JobList;