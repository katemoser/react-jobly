import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import JoblyApi from "./api";
import JobList from "./JobList";
import Loading from "./Loading";

/**
 * Company detail page with company description and list of jobs
 * 
 * props: none
 * 
 * state: company
 *  ex. { handle, name, description, numEmployees, logoUrl, jobs }
*       where jobs is [{ id, title, salary, equity }, ...]
 * 
 * Router -> CompanyDetail -> Joblist
 */
 function CompanyDetail(){
    const [company, setCompany] = useState(null);
    const params = useParams();

    console.log("Company Detail: ", company, params);

    /** Fetches data for specific company using handle and sets it to state */
    useEffect(function fetchCompanyOnMount(){
        async function fetchcompanyInfo(){
            setCompany(await JoblyApi.getCompany(params.companyHandle));
        }
        fetchcompanyInfo();
    }, [params.companyHandle]);

    if(!company) return <Loading />

    return (
        <div>
            <h1>{company.name}</h1>
            <p>{company.description}</p>
            <JobList jobs={company.jobs} />
        </div>
    )

}

export default CompanyDetail;