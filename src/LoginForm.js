import {useState} from "react";

/** LoginForm component, which displays login form for non-logged-in user
 * 
 * Props:
 *  Login function : Calls function in App component to login a user via the API
 * 
 * State: None
 * 
 * App -> Routes -> Login
 */
function LoginForm({ handleLogin }) {
    const initialData = {"username": "", "password": ""}

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
    function handleSubmit(evt) {
        evt.preventDefault();
        handleLogin(formData);
        setFormData(initialData);
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