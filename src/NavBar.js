import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import { useContext } from "react";
import UserContext from "./userContext";

/**
 * NavBar for our site with links to homepage, companies, jobs
 * 
 * props: None
 * 
 * State: none
 * 
 * App -> NavBar -  -  -  > {homepage, companies, jobs}
 * 
 */
function NavBar() {

    const { currentUser } = useContext(UserContext);

    if (currentUser) {

        return (
            <nav className="Jobly-NavBar">
                <NavLink className="Brand" exact to="/" >Jobly</NavLink>

                <NavLink className="NavLink" exact to="/companies" >Companies</NavLink>
                <NavLink className="NavLink" exact to="/jobs" >Jobs</NavLink>
                <NavLink className="NavLink" exact to="/profile" >Profile</NavLink>

                <NavLink className="NavLink" exact to="/" >Log Out</NavLink>
            </nav>
        )
    }
    else {
        return (
            <nav className="Jobly-NavBar">

                <NavLink className="Brand" exact to="/" >Jobly</NavLink>
                <NavLink className="NavLink" exact to="/signup" >Sign Up</NavLink>
                <NavLink className="NavLink" exact to="/login" >Login</NavLink>
            </nav>
        )
    }
}

export default NavBar;