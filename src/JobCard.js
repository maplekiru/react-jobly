import React from 'react';

/**
 * JobCard
 * 
 * State: TBD
 * Props: 
 * - job: { id, title, salary, equity }
 * 
 * JobCardList --> JobCard
 */
function JobCard({ job }) {
  const style = { width: '50rem',
  margin: '10px'}
  return (
      <div className="card" style={style}>
          <div className="card-body">
            <h5 className="card-title">{job.title}</h5>
            <p className="card-text">Salary: ${job.salary}</p>
            <p className="card-text">Equity: {job.Equity || '0'}</p>
          </div>
        </div>
  )
}
export default JobCard;