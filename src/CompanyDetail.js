import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import JoblyApi from "./api";

/**
 * Company detail page with company description and list of jobs
 * 
 * props: none
 * 
 * state: company
 * 
 * Router -> Company detail -> Joblist
 */
 function CompanyDetail(){
    const [company, setCompany] = useState(null);
    const params = useParams();
    console.log("params: ", params);

    useEffect(function fetchCompanyOnMount(){
        async function fetchcompanyInfo(){
            setCompany(await JoblyApi.getCompany(params.companyHandle));
        }
        fetchcompanyInfo();
    }, [params.companyHandle]);

    if(!company) return <p>Loading...</p>;

    return (
        <div>
            <h1>{company.name}</h1>
            <p>{company.description}</p>
            <ul>
                {company.jobs.map(job => <li key={job.id}>{job.title}</li>)}
            </ul>
        </div>
    )

}

export default CompanyDetail;