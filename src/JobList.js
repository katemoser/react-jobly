import React from "react";
import {List} from "reactstrap";
import JobCard from "./JobCard";
import "./JobList.css";


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
        <List className="JobList">
            {jobs.map(job =>
            <li key={job.id}><JobCard job={job}/></li>)}
        </List>
    )
}

export default JobList;