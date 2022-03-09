import React from "react";

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
function JobCard({job}) {
    return (
        <div>
            <h3>{job.title}</h3>
            <p>Salary: {job.salary}</p>
            <p>Equity: {job.equity}</p>
        </div>
    )
}

export default JobCard;