import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import { useContext } from "react";
import UserContext from "./userContext";

/**
 * NavBar for our site with links to homepage, companies, jobs, profile, 
 *  and sign out if you are logged in
 * 
 *  If you are logged out, then it will display links for homepage, signup, and login
 * 
 * props: logout function from parents
 * 
 * State: none
 * 
 * Context:
 * - currentUser : a user object
 *      ex. { username, firstName, lastName, isAdmin, jobs }
 *    where jobs is { id, title, companyHandle, companyName, state }
 * 
 * App -> NavBar -  - LI -  > {homepage, companies, jobs, profile, logout}
 * App -> NavBar -  - NLI -  > {homepage, signup, login}
 * 
 */
function NavBar({ logout }) {

    const { currentUser } = useContext(UserContext);

    return (
        <nav className="Jobly-NavBar">
            <NavLink className="brand" exact to="/" >Jobly</NavLink>
            {currentUser &&
                <div>
                    <NavLink className="NavLink" exact to="/companies" >Companies</NavLink>
                    <NavLink className="NavLink" exact to="/jobs" >Jobs</NavLink>
                    <NavLink className="NavLink" exact to="/profile" >Profile</NavLink>

                    <NavLink
                        className="NavLink"
                        exact to="/"
                        onClick={logout}>
                        Log Out {currentUser.firstName}
                    </NavLink>
                </div>}
            {!currentUser &&
                <div>
                    <NavLink className="NavLink" exact to="/signup" >Sign Up</NavLink>
                    <NavLink className="NavLink" exact to="/login" >Login</NavLink>
                </div>
            }
        </nav>
    )
}

export default NavBar;