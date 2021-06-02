import React, { useEffect, useState } from 'react';
import CompanyCard from './CompanyCard';
import JoblyAPI from './JoblyAPI'
import './CompanyList.css'
import SearchForm from './SearchForm'

/**
 * CompanyList
 * 
 * State: 
 *  - companies:[{handle, name, descriptions, logoUrl, numEmployees}...]
 * Props: handleSearch
 * 
 * Routes --> CompanyList --> {SearchForm, CompanyCard}
 */
function CompanyList() {

  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState(null);

  function handleSearch(search) {
    setSearchTerm(search);
  }

  useEffect(function getCompanies(){
    async function companiesAPI() {
      let companyList = await JoblyAPI.getCompanies(searchTerm);
      setCompanies(companyList);
    }
    companiesAPI()
  },[searchTerm])

  return (
    <div className='CompanyList'>
      <SearchForm handleSearch={handleSearch}/>
      {companies.map(company=> 
      <CompanyCard key={company.handle} company={company}/>)}
    </div>
  )
}
export default CompanyList;