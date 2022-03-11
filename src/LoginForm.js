import {useState} from "react";
import { Redirect } from "react-router-dom";

/** LoginForm component, which displays login form for non-logged-in user
 * 
 * Props:
 *  handleLogin : function that calls function in App component to login a user via the API
 * 
 * State: 
 *  - formData (controlled component)
 *  - formSubmitted : a boolean that is toggled when form is submitted
 * 
 * App -> Routes -> LoginForm
 */
function LoginForm({ handleLogin }) {
    // TODO: Consider not putting quotes for these keys
    const initialData = {"username": "", "password": ""}

    const [formData, setFormData] = useState(initialData);
    const [formSubmitted, setFormSubmitted] = useState(false);

    /** Updates state with form input value */
    function handleChange(evt){
        const fieldName = evt.target.name;
        const value = evt.target.value;

        setFormData(currData => {
            currData[fieldName] = value;
            return {...currData};
        });
    }

    // TODO: Consider awaiting handleLogin to deal with error here for incorrect login info
    /** Calls parent component function with input data */
    function handleSubmit(evt) {
        evt.preventDefault();
        handleLogin(formData);
        setFormData(initialData);
        setFormSubmitted(true);
    }

    if (formSubmitted) {
        return <Redirect push to="/" />
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="username-input">Username</label>
            <input id="username-input" name="username" onChange={handleChange}></input>
            <label htmlFor="password-input">Password</label>
            <input id="password-input" name="password" onChange={handleChange}></input>
            <button>Submit</button>
        </form>);
}

export default LoginForm;