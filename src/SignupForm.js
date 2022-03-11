import { useState } from "react";
import { Redirect } from "react-router-dom";

/** SignupForm for non-logged-in user
 * 
 * Props:
 *  Signup function : Calls function in App component to signup a user via the API
 * 
 * State:
 *  - formData (controlled component)
 *  - formSubmitted : a boolean that is toggled when form is submitted
 * 
 * App -> Routes -> SignupForm
 */
function SignupForm({ handleSignup }) {

    const initialData = {
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
    }

    const [formData, setFormData] = useState(initialData);
    const [formSubmitted, setFormSubmitted] = useState(false);

    /** Updates state with form input value */
    function handleChange(evt) {
        const fieldName = evt.target.name;
        const value = evt.target.value;

        setFormData(currData => {
            currData[fieldName] = value;
            return { ...currData };
        });
    }

    /** Calls parent component function with input data */
    async function handleSubmit(evt) {
        evt.preventDefault();
        await handleSignup(formData);
        setFormData(initialData);
        setFormSubmitted(true);
    }

    if (formSubmitted) {
        return <Redirect push to="/" />
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="username-input">Username:</label>
            <input
                id="username-input"
                name="username"
                onChange={handleChange}
                required>
            </input>

            <label htmlFor="password-input">Password:</label>
            <input
                id="password-input"
                name="password"
                onChange={handleChange}
                type="password"
                required>
            </input>

            <label htmlFor="firstName-input">First Name:</label>
            <input
                id="firstName-input"
                name="firstName"
                onChange={handleChange}
                required>
            </input>

            <label htmlFor="lastName-input">Last Name:</label>
            <input
                id="lastName-input"
                name="lastName"
                onChange={handleChange}
                required>
            </input>

            <label htmlFor="email-input">Email:</label>
            <input
                id="email-input"
                name="email"
                onChange={handleChange}
                type="email"
                required>
            </input>

            <button>Submit</button>
        </form>);



}

export default SignupForm;