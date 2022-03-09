import { useState} from "react";

/**
 * Search bar component for use in various other components
 * 
 * props: handleSave (function located in parent component )
 * 
 * state: formData (controlled component)
 */
function SearchForm({handleSave}){
    const [formData, setFormData] = useState("");

    function handleChange(evt){
        console.log(evt);
    }
    function handleSubmit(evt){
        evt.preventDefault();
        handleSave();
        //do whatever

    }

    return (
        <form onSubmit={handleSubmit} className="Jobly-SearchForm">
            <input onChange={handleChange}></input>
            <button>Search</button>
        </form>
    )
}

export default SearchForm;