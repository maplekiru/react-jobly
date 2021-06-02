import React from 'react';
import Card from 'react-bootstrap/Card'

/**
 * JobCard
 * 
 * State: None
 * Props: 
 * - job: { id, title, salary, equity }
 * 
 * JobCardList --> JobCard
 */
function JobCard({ job }) {
  const style = { width: '50rem',
  margin: '10px'}
  return (
      <Card style={style}>
          <Card.Body>
            <Card.Title>{job.title}</Card.Title>
            <Card.Text>Salary: ${job.salary}</Card.Text>
            <Card.Text>Equity: {job.equity || '0'}</Card.Text>
          </Card.Body>
        </Card>
  )
}
export default JobCard;