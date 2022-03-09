import React from "react";
import CompanyCard from "./CompanyCard";

/** CompanyList component shows a list of companies obtained from 
 * CompaniesDataFetcher component
 * 
 * Props:
 *  companies: a list of company objects
 * ex. [ { handle, name, description, numEmployees, logoUrl }, ...]
 * 
 * State: None
 * 
 * CompaniesDataFetcher -> CompanyList -> CompanyCard
 */
function CompanyList({companies}) {
    return (
        <ul>
            {companies.map(company => 
            <li key={company.handle}><CompanyCard company={company}/></li>)}
        </ul>
    )
}

export default CompanyList;