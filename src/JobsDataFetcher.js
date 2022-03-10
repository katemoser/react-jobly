import JoblyApi from "./api";
import {useState, useEffect} from "react";
import JobList from "./JobList";
import SearchForm from "./SearchForm";
import Loading from "./Loading";

/** JobsDataFetcher component fetches a list of job objects from API
 * GET request and renders SearchForm and JobList components
 * 
 * Props: None
 * 
 * State: List of job objects
 *  ex. [ { id, title, salary, equity, companyHandle, companyName }, ...]
 * 
 * Routes -> JobsDataFetcher -> {SearchForm, JobList}
 */
 function JobsDataFetcher(){
    const [jobs, setJobs] = useState(null);

    console.log("JOBSDATAFETCHER: ", jobs);

    /** Fetches a list of all jobs and sets to state on mount */
    useEffect(function fetchJobsWhenMounted() {
        async function fetchJobs() {
            setJobs(await JoblyApi.getJobs());
        };
        fetchJobs();
    }, []);


    /** Fetches list of jobs filtered by search term and sets it as state */
    async function searchJobs(searchTerm){
        setJobs(await JoblyApi.getJobs({ title: searchTerm}));
    }

    if (!jobs) return <Loading />

    return (
        <div>
            <SearchForm handleSave={searchJobs}/>
            <JobList jobs={jobs} />
        </div>
    )
}

export default JobsDataFetcher;