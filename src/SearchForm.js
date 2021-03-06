import { useState} from "react";
import "./SearchForm.css";

/**
 * Search bar component for use in various other components
 * 
 * props: handleSave (function located in parent component)
 * 
 * state: formData (controlled component)
 * 
 * { CompaniesDataFetcher, JobsDataFetcher } -> SearchForm
 */
function SearchForm({handleSave}){
    const initialData = { "searchInput" : "" };

    const [formData, setFormData] = useState(initialData);

    /** Updates state with form input value */
    function handleChange(evt){
        const fieldName = evt.target.name;
        const value = evt.target.value;

        setFormData(currData => {
            currData[fieldName] = value;
            return {...currData};
        });
    }

    /** Calls parent component function with input data */
    function handleSubmit(evt){
        evt.preventDefault();
        handleSave(formData.searchInput);
        setFormData(initialData);
    }

    return (
        <form onSubmit={handleSubmit} className="Jobly-SearchForm">
            <input 
                onChange={handleChange} 
                name="searchInput" 
                placeholder="Enter search term">
            </input>
            <button>Search</button>
        </form>
    )
}

export default SearchForm;