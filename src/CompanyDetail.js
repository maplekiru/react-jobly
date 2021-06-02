import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom'
import JobCardList from './JobCardList';
import JoblyAPI from './JoblyAPI'

import './CompanyDetail.css'

/**
 * CompanyDetail
 * 
 * State: None
 * Props: None
 * 
 * Routes --> CompanyDetail --> JobCardList
 */
function CompanyDetail() {
  const [company, setCompany] = useState(null);
  const { name } = useParams();

  useEffect(function getCompany() {
    async function CompanyAPI() {
      try {
        const companyInfo = await JoblyAPI.getCompany(name);
        setCompany(companyInfo)
      } catch {
        <Redirect to='/companies' />
      }
    }
    CompanyAPI();
  }, [name])

  function renderCompanyInfo() {
    return (
      <div className='CompanyDetail'>
        <h3>{name} </h3>
        <h6> {company.description} </h6>
        <JobCardList jobs={company.jobs} />
      </div>
    )
  }

  return company ? renderCompanyInfo() : null


}
export default CompanyDetail;