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
 * 
 * Routes -> CompaniesDataFetcher -> {SearchForm, CompanyList}
 */
function CompaniesDataFetcher(){
    const [companies, setCompanies] = useState(null);

    console.log("COMPANIESDATAFETCHER: ", companies);

    useEffect(function fetchCompaniesWhenMounted() {
        async function fetchCompanies() {
            setCompanies(await JoblyApi.getCompanies());
        };
        fetchCompanies();
    }, []);

    function searchCompanies(){
        console.log("Searcching companies!");
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