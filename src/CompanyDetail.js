import React from 'react';
import { useParams } from 'react-router-dom'
import JobCardList from './JobCardList';

/**
 * CompanyDetail
 * 
 * State: TBD
 * Props: TBD
 * 
 * Routes --> CompanyDetail --> JobCardList
 */
function CompanyDetail() {
  const { name } = useParams();

  return (
    <div>
      CompanyDetail: {name}
      <JobCardList/>
    </div>
  )
}
export default CompanyDetail;