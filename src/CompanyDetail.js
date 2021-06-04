import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import JobCardList from './JobCardList';
import JoblyAPI from './JoblyAPI'
import Alert from 'react-bootstrap/Alert'

import './CompanyDetail.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';


/**
 * CompanyDetail
 * 
 * State: 
 *  - {handle, name, description, logoUrl, numEmployees}
 *  - errors: [error, ...]
 *  - isLoading: true or false
 * 
 * Params: name
 * Props: None
 * 
 * Routes --> CompanyDetail --> JobCardList
 */
function CompanyDetail() {
  const [company, setCompany] = useState(null);
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { name } = useParams();

  /** On mount and change of name ->
   * make request to JoblyApi and set state of company
  */
  useEffect(function getCompany() {
    async function fetchCompanyAPI() {
      try {
        const companyInfo = await JoblyAPI.getCompany(name);
        setCompany(companyInfo);
        setIsLoading(false)
      } catch (err) {
        setErrors(err);
        setIsLoading(false);
        console.log("Error:,", err)
      }
    }
    fetchCompanyAPI();
  }, [name])

  if (errors) {
    return (errors.map((error, idx) =>
      (<Alert key={idx} variant='danger'> {error} </Alert>)))
  }
  if (isLoading) return <Spinner animation='border' variant='primary' />


  function renderCompanyInfo() {
    return (
      <Container id='company-detail-container'>
        <Row>
          <Col className='CompanyDetail'>
            <h3>{name} </h3>
            <h6> {company.description} </h6>
            <JobCardList jobs={company.jobs} />
          </Col>
        </Row>
      </Container>
    )
  }
  return company ? renderCompanyInfo() : null
}
export default CompanyDetail;