import {useState} from "react";
/** Signup component, which displays signup form for non-logged-in user
 * 
 * Props:
 *  Signup function : Calls function in App component to signup a user via the API
 * 
 * State: None
 * 
 * App -> Routes -> Signup
 */
 function SignupForm({handleSignup}) {

    const initialData = {
        username: "", 
        password: "",
        firstName: "",
        lastName: "",
        email: "",
}

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
        handleSignup(formData);
        setFormData(initialData);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="username-input">Username:</label>
            <input id="username-input" name="username" onChange={handleChange}></input>

            <label htmlFor="password-input">Password:</label>
            <input id="password-input" name="password" onChange={handleChange}></input>

            <label htmlFor="firstName-input">First Name:</label>
            <input id="firstName-input" name="firstName" onChange={handleChange}></input>

            <label htmlFor="lastName-input">Last Name:</label>
            <input id="lastName-input" name="lastName" onChange={handleChange}></input>

            <label htmlFor="email-input">Email:</label>
            <input id="email-input" name="email" onChange={handleChange}></input>

            <button>Submit</button>
        </form>);



}

export default SignupForm;