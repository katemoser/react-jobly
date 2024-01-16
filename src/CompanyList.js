import React from "react";
import CompanyCard from "./CompanyCard";
import "./CompanyList.css";

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
function CompanyList({ companies }) {
    return (
        <div className="CompanyList .col-sm-12 .col-md-6 .offset-md-3">
        {
            companies.map(company =>

                // key={company.handle}
                // className=".col-sm-12 .col-md-6 .offset-md-3">
                <CompanyCard key={company.handle} company={company} />)
        }
        </div>
    )

}

export default CompanyList;