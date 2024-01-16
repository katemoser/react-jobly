import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import "./Card.css";
import "./CompanyCard.css";

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
function CompanyCard({ company }) {
    // TODO: refactor props to 4 props
    return (
        <Card className="CompanyCard">
            <CardBody>
                <h1>{company.name}</h1>
                <p>{company.description}</p>
                <img src={company.logoUrl || "logos/logo1.png"} alt={`${company.name} logo`}></img>

                <Link className="stretched-link" to={`/companies/${company.handle}`} />
            </CardBody>
        </Card>
    );
}

export default CompanyCard;