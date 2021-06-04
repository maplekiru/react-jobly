import React, { useEffect, useState } from 'react';
import JobCardList from './JobCardList';
import JoblyAPI from './JoblyAPI';
import SearchForm from './SearchForm';
import './JobList.css';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import './Spinner.css';


/**
 * JobList
 * 
 * State: 
 * - jobs: [{ id, title, salary, equity }, ...]
 * - searchTerm: ''
 * - errors: [error, ...]
 * - isLoading: true or false
 * Props: None
 * 
 * Routes --> JobList --> {SearchForm, JobCardList}
 */
function JobList() {
  const [jobs, setJobs] = useState([]);
  const [errors, setErrors] = useState(false)
  const [searchTerm, setSearchTerm] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  function handleSearch(search) {
    setSearchTerm(search);
    setIsLoading(true);
  }

  /** On mount and change of searchTerm ->
  * make request to JoblyApi and set state of jobs
 */
  useEffect(function getJobs() {
    async function fetchJobsAPI() {
      try {
        const jobList = await JoblyAPI.getJobs(searchTerm);
        setJobs(jobList);
        setIsLoading(false);
      } catch {
        setErrors(true);
      }
    }
    fetchJobsAPI()
  }, [searchTerm])

  if (errors) {
    return (errors.map((error, idx) =>
      (<Alert key={idx} variant='danger'> {error} </Alert>)))
  }

  if (isLoading) return (
    <div className='d-flex justify-content-center spinner-container'>
      <Spinner animation='border' variant='primary' />
    </div>
  )

  return (
    <Container className='JobList'>
      <SearchForm handleSearch={handleSearch} />
      <JobCardList jobs={jobs} />
    </Container>
  )
}
export default JobList;