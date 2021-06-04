import React, { useEffect, useState } from 'react';

import CompanyCard from './CompanyCard';
import JoblyAPI from './JoblyAPI'
import './CompanyList.css'
import SearchForm from './SearchForm'
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'
import './Spinner.css'


/**
 * CompanyList
 * 
 * State: 
 *  - companies:[{handle, name, descriptions, logoUrl, numEmployees}...]
 *  - searchTerm: ''
 *  - errors: [error, ...]
 *  - isLoading: true or false
 * Props: handleSearch
 * 
 * Routes --> CompanyList --> {SearchForm, CompanyCard}
 */
function CompanyList() {

  const [companies, setCompanies] = useState([]);
  const [errors, setErrors] = useState(null)
  const [searchTerm, setSearchTerm] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  function handleSearch(search) {
    setSearchTerm(search);
    setIsLoading(true);
  }

  /** On mount and change of searchTerm ->
   * make request to JoblyApi and set state of companies
  */
  useEffect(function getCompanies() {
    async function fetchCompaniesAPI() {
      try {
        const companyList = await JoblyAPI.getCompanies(searchTerm);
        setCompanies(companyList);
        setIsLoading(false)
      } catch (err) {
        setErrors(err);
      }
    }
    fetchCompaniesAPI()
  }, [searchTerm])

  if (errors) {
    return (errors.map((error, idx) =>
      (<Alert key={idx} variant='danger'> {error} </Alert>)))
  }
  if (isLoading) return (
    <div className='d-flex justify-content-center spinner-container'>
      <Spinner animation='border' variant='primary' />
    </div>
  )

  return (
    <Container className='CompanyList'>
      <SearchForm handleSearch={handleSearch} />
      {companies.map(company =>
        <CompanyCard key={company.handle} company={company} />)}
    </Container>
  )
}
export default CompanyList;