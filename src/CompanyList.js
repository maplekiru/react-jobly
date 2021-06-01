import React from 'react';
import CompanyCard from './CompanyCard';
// import SearchForm from './SearchForm'


/**
 * CompanyList
 * 
 * State: TBD
 * Props: None
 * 
 * Routes --> CompanyList --> {SearchForm, CompanyCard}
 */
function CompanyList() {
  return (
    <div>
      CompanyList
      <CompanyCard companyInfo={{ name: 'company1' }} />
    </div>
  )
}
export default CompanyList;