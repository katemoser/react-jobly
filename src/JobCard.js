import React from "react";
import "./Card.css";
import "./JobCard.css";
import { Card, CardBody } from "reactstrap";

/** JobCard component is a card with job info
 *
 * Props:
 *  job: a job object
 * ex. { id, title, salary, equity, companyHandle, companyName }
 *
 * State: None
 *
 * JobsDataFetcher -> JobList -> JobCard
 */
function JobCard({ job }) {
    return (
        <Card className="JobCard">
            <CardBody>
                <h3>{job.title}</h3>
                <h4>{job.companyName}</h4>
                <p>Salary: {job.salary}</p>
                <p>Equity: {job.equity}</p>
            </CardBody>
        </Card>
    );
}

export default JobCard;