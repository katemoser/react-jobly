import EditProfileForm from "./EditProfileForm";

/** Profile component, which displays edit profile form for a logged-in user
 * 
 * Props:
 *  EditProfile function : Calls function in App component to edit a user via the API
 * 
 * State: None
 * 
 * App -> Routes -> Profile (WILL RENDER PROFILEEDIT FORM)
 */
 function Profile({handleEditProfile}) {
    return <EditProfileForm handleSaveChanges={handleEditProfile}/>;
}

export default Profile;