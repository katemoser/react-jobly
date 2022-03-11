import { useState } from "react";
import { Redirect } from "react-router-dom";
import { useContext } from "react";
import UserContext from "./userContext";

/** EditProfileForm component, which displays form to edit user info for logged-in user
 * 
 * Props:
 *  handleSaveChanges : function that calls function in App component to update a user via the API
 * 
 * State: 
 *  - formData (controlled component)
 *  - formSubmitted : a boolean that is toggled when form is submitted
 * 
 * App -> Routes -> Profile -> EditProfileForm
 */
function EditProfileForm({ handleSaveChanges }) {
    //get the user from context and set to initial data
    const { currentUser } = useContext(UserContext);
    console.log(currentUser);

    // TODO: object shorthand
    const initialData = {
        username: currentUser.username,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
    };

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

    /** Upon submit, calls parent function to update current user info */
    async function handleSubmit(evt) {
        evt.preventDefault();
        await handleSaveChanges({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
        });
        setFormData(formData);
        setFormSubmitted(true);
    }

    if (formSubmitted) {
        return <Redirect push to="/" />
    }

    // TODO: Add required attributes for inputs
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="username-input">Username</label>
            <input
                disabled
                id="username-input"
                name="username"
                onChange={handleChange}
                value={formData.username}></input>
            <label htmlFor="firstName-input">First Name</label>
            <input
                id="firstName-input"
                name="firstName"
                onChange={handleChange}
                value={formData.firstName}></input>
            <label htmlFor="lastName-input">Last Name</label>
            <input
                id="lastName-input"
                name="lastName"
                onChange={handleChange}
                value={formData.lastName}></input>
            <label htmlFor="email-input">Email</label>
            <input
                id="email-input"
                name="email"
                type="email"
                onChange={handleChange}
                value={formData.email}></input>
            <button>Submit</button>
        </form>);
}

export default EditProfileForm;