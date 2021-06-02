import React from 'react';
import { Link } from 'react-router-dom';

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
  const style = {width: '30rem',
margin: '10px'}
  return (
    <div>
        <div className="card" style={style}>
          <div className="card-body">
          <Link to={`./companies/${company.handle}`}>
            <h5 className="card-title">{company.name}</h5>
            </Link>
            <p className="card-text">{company.description}</p>
            <img className="card-image" src={company.src} alt=''/>
          </div>
        </div>
      
    </div>
  )
}
export default CompanyCard;