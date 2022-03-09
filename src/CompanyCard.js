import React from "react";
import { Link } from "react-router-dom";

/** CompanyCard component is a clickable card with company info
 * 
 * Props:
 *  company: a company object
 * ex. { handle, name, description, numEmployees, logoUrl }
 * 
 * State: None
 * 
 * CompaniesDataFetcher -> CompanyList -> CompanyCard
 */
function CompanyCard({company}) {
    return (
        <div>
            <Link to={`/companies/${company.handle}`}> 
            <h1>{company.name}</h1>
            <p>{company.description}</p>
            <img src={company.logoUrl} alt="company logo"></img>
            </Link>
        </div>
    )
}

export default CompanyCard;