import React from 'react';
import { Link } from 'react-router-dom';

/**
 * CompanyCard
 * 
 * State: TBD
 * Props: {companyInfo}
 * 
 * CompanyList --> CompanyCard
 */
function CompanyCard({ companyInfo }) {
  return (
    <div>
      <Link to={`./companies/${companyInfo.name}`}>
        CompanyCard: {companyInfo.name}
      </Link>
    </div>
  )
}
export default CompanyCard;