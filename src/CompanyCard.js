import React from 'react';
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom';
import './CompanyCard.css'

/**
 * CompanyCard
 * 
 * State: TBD
 * Props: 
 * - company: {handle, name, description, logoUrl, numEmployees}
 * 
 * CompanyList --> CompanyCard
 */
function CompanyCard({ company }) {
  const style = {width: '50rem',
margin: '10px'}
  return (
        <Card style={style}>
          <Link className='CompanyCard' to={`./companies/${company.handle}`}>
          <Card.Body>
            <Card.Title>{company.name}</Card.Title>
            <Card.Text>{company.description}</Card.Text>
            <Card.Img variant='right' src={company.src} alt=''></Card.Img>
          </Card.Body>
          </Link>
        </Card> 
  )
}
export default CompanyCard;