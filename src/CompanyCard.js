import React from 'react';
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
    <div>
        <a className="card CompanyCard" href={`./companies/${company.handle}`} style={style}>
          <div className="card-body">
            <h5 className="card-title">{company.name}</h5>
            <p className="card-text">{company.description}</p>
            <img className="card-image" src={company.src} alt=''/>
          </div>
        </a>
      
    </div>
  )
}
export default CompanyCard;