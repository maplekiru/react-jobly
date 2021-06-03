import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom'
import JobCardList from './JobCardList';
import JoblyAPI from './JoblyAPI'
import Alert from 'react-bootstrap/Alert'
import CurrentUserContext from './CurrentUserContext'

import './CompanyDetail.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

/**
 * CompanyDetail
 * 
 * State: 
 *  - {handle, name, description, logoUrl, numEmployees}
 * Props: None
 * 
 * Routes --> CompanyDetail --> JobCardList
 */
function CompanyDetail() {
  const [company, setCompany] = useState(null);
  const [apiError, setApiError] = useState(null); 
  const { name } = useParams();

  const currentUser = useContext(CurrentUserContext)
  
  useEffect(function getCompany() {
    async function fetchCompanyAPI() {
      try {
        const companyInfo = await JoblyAPI.getCompany(name);
        setCompany(companyInfo)
      } catch (err) {
        setApiError(err);
      } 
    }
    fetchCompanyAPI();
  }, [name])

  if (!currentUser) return <Alert variant='warning'> Please login in to view page </Alert>
  if (apiError) return <Alert variant='danger'> {apiError} </Alert>;

  function renderCompanyInfo() {
    return (
      <Container>
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