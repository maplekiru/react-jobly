import  Button  from 'react-bootstrap/Button';
import React, { useContext } from 'react';
import Card from 'react-bootstrap/Card';
import CurrentUserContext from './CurrentUserContext';
import ApplyJobContext from './ApplyJobContext'
import { useState } from 'react';
import Alert from 'react-bootstrap/Alert'

/**
 * JobCard
 * 
 * State: 
 * - isApplied
 * - errors
 * Props: 
 * - job: { id, title, salary, equity }
 * 
 * JobCardList --> JobCard
 */
function JobCard({ job }) {
  const currentUser = useContext(CurrentUserContext);
  const intialApplyStatus = currentUser.applications.includes(job.id)

  const [isApplied, setIsApplied] = useState(intialApplyStatus);
  const [errors, setErrors] = useState(null)
  
  const handleApplyJob = useContext(ApplyJobContext);


  /** handle apply to job button */
  async function handleSubmit(){
    const applyResult = await handleApplyJob(currentUser.username, job.id);
    if (applyResult.success) {
      setIsApplied(true)
    } else {
      setErrors(applyResult.errors)
    }
  }

  /** handle rendering apply button based on application status */
  function renderApplyButton() {
    if (isApplied) {
      return <Button variant='danger' disabled> Applied </Button>
    }
    return <Button variant='primary' onClick={handleSubmit}> Apply </Button>
  }

  const style = {
    width: '40rem',
    margin: '10px'
  }

  if (errors) {
    return (errors.map((error, idx) =>
      (<Alert key={idx} variant='danger'> {error} </Alert>)))
  }

  return (
    <Card style={style}>
      <Card.Body>
        <Card.Title>{job.title}</Card.Title>
        <Card.Text>Salary: ${job.salary || 0}</Card.Text>
        <Card.Text>Equity: {job.equity || 0}</Card.Text>
        {renderApplyButton()}
      </Card.Body>
    </Card>
  )
}
export default JobCard;