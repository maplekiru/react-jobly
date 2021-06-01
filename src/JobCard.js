import React from 'react';

/**
 * JobCard
 * 
 * State: TBD
 * Props: {jobInfo}
 * 
 * JobCardList --> JobCard
 */
function JobCard({ jobInfo }) {
  return (
    <div>
      JobCard: {jobInfo.title}
    </div>
  )
}
export default JobCard;