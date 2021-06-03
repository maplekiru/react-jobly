import React, { useContext, useEffect, useState } from 'react';
import CompanyCard from './CompanyCard';
import JoblyAPI from './JoblyAPI'
import './CompanyList.css'
import SearchForm from './SearchForm'
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert'

import CurrentUserContext from './CurrentUserContext';

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
  const [apiError, setApiError] = useState(null)
  const [searchTerm, setSearchTerm] = useState(null);

  const currentUser = useContext(CurrentUserContext)

  function handleSearch(search) {
    setSearchTerm(search);
  }

  useEffect(function getCompanies() {
    async function fetchCompaniesAPI() {
      try {
        const companyList = await JoblyAPI.getCompanies(searchTerm);
        setCompanies(companyList);
      } catch(err) {
        setApiError(err);
      }
    }
    fetchCompaniesAPI()
  }, [searchTerm])

  if (!currentUser) return <Alert variant='warning'> Please login in to view page </Alert>
  if (apiError) return <Alert variant='danger'> {apiError} </Alert>;

  return (
    <Container className='CompanyList'>
      <SearchForm handleSearch={handleSearch} />
      {companies.map(company =>
        <CompanyCard key={company.handle} company={company} />)}
    </Container>
  )
}
export default CompanyList;