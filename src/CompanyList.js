import React, { useEffect, useState } from 'react';
import CompanyCard from './CompanyCard';
import JoblyAPI from './JoblyAPI'
import './CompanyList.css'
import SearchForm from './SearchForm'
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert'

/**
 * CompanyList
 * 
 * State: 
 *  - companies:[{handle, name, descriptions, logoUrl, numEmployees}...]
 *  - searchTerm: ''
 * Props: handleSearch
 * 
 * Routes --> CompanyList --> {SearchForm, CompanyCard}
 */
function CompanyList() {

  const [companies, setCompanies] = useState([]);
  const [isApiError, setIsApiError] = useState(false)
  const [searchTerm, setSearchTerm] = useState(null);

  function handleSearch(search) {
    setSearchTerm(search);
  }

  useEffect(function getCompanies() {
    async function fetchCompaniesAPI() {
      try {
        const companyList = await JoblyAPI.getCompanies(searchTerm);
        setCompanies(companyList);
      } catch {
        setIsApiError(true);
      }
    }
    fetchCompaniesAPI()
  }, [searchTerm])

  if (isApiError) return <Alert variant='danger'> API Error </Alert>;

  return (
    <Container className='CompanyList'>
      <SearchForm handleSearch={handleSearch} />
      {companies.map(company =>
        <CompanyCard key={company.handle} company={company} />)}
    </Container>
  )
}
export default CompanyList;