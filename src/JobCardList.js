import React from 'react';
import JobCard from './JobCard';
import Container from 'react-bootstrap/Container';
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
    <Container className='JobCardList'>
      {jobs.map(job => 
      <JobCard key={job.id} job={job} />)}
    </Container>
  )
}
export default JobCardList;