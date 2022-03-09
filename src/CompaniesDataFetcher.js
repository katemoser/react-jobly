import JoblyApi from "./api";
import {useState, useEffect} from "react";
import CompanyList from "./CompanyList";
import SearchForm from "./SearchForm";

/** CompaniesDataFetcher component fetches a list of company objects from API
 * GET request and renders SearchForm and CompanyList components
 * 
 * Props: None
 * 
 * State: List of company objects
 *  ex. [ { handle, name, description, numEmployees, logoUrl }, ...]
 * 
 * Routes -> CompaniesDataFetcher -> {SearchForm, CompanyList}
 */
function CompaniesDataFetcher(){
    const [companies, setCompanies] = useState(null);

    console.log("COMPANIESDATAFETCHER: ", companies);

    /** Fetches a list of all companies and sets to state on mount */
    useEffect(function fetchCompaniesWhenMounted() {
        async function fetchCompanies() {
            setCompanies(await JoblyApi.getCompanies());
        };
        fetchCompanies();
    }, []);

    // TODO: Consider having constants for response from API GET request
    /** Fetches list of companies filtered by search term and sets it as state */
    async function searchCompanies(searchTerm){
        setCompanies(await JoblyApi.getCompanies({ name: searchTerm}));
    }

    if (!companies) return <p>Loading...</p>

    return (
        <div>
            <SearchForm handleSave={searchCompanies}/>
            <CompanyList companies={companies} />
        </div>
    )
}

export default CompaniesDataFetcher;