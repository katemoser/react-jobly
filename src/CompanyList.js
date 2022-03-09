import React from "react";
import CompanyCard from "./CompanyCard";
import "./List.css";

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
        <ul className="Jobly-CompanyList List">
            {companies.map(company => 
            <li key={company.handle}><CompanyCard company={company}/></li>)}
        </ul>
    )
}

export default CompanyList;