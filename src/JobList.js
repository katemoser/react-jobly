import React from "react";
import JobCard from "./JobCard";

/** JobList component shows a list of jobs obtained from 
 * JobsDataFetcher component
 * 
 * Props:
 *  jobs: a list of job objects
 * ex. [ { id, title, salary, equity, companyHandle, companyName }, ...]
 * 
 * State: None
 * 
 * { JobsDataFetcher, CompanyDetail } -> JobList -> JobCard
 */
function JobList({jobs}) {
    return (
        <ul>
            {jobs.map(job => 
            <li key={job.id}><JobCard job={job}/></li>)}
        </ul>
    )
}

export default JobList;