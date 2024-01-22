import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "./api";
import JobList from "./JobList";
import Loading from "./Loading";
import "./CompanyDetail.css";
import ErrorMessage from "./ErrorMessage";
import { Alert } from "reactstrap";

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
function CompanyDetail() {
    const [company, setCompany] = useState(null);
    const [errors, setErrors] = useState([]);

    const { handle } = useParams();

    console.log("Company Detail: ", company, handle);

    /** Fetches data for specific company using handle and sets it to state */
    useEffect(function fetchCompany() {
        async function fetchcompanyInfo() {
            try {
                const company = await JoblyApi.getCompany(handle);
                setCompany(company);
            } catch (err) {
                setErrors(err);
            }
        }
        fetchcompanyInfo();
    }, [handle]);

    if (!company && !errors.length) return <Loading />;

    if(errors.length) return <ErrorMessage error={errors} />
    // TODO: refactor error below to return a whole 404 component
    return (

                <div className="CompanyDetail">
                    <h1 classname="CompanyDetail-header">{company.name}</h1>
                    <h3 classname="CompanyDetail-description">{company.description}</h3>
                    <JobList jobs={company.jobs} />
                </div>
    );

}

export default CompanyDetail;