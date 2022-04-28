import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import { useContext } from "react";
import UserContext from "./userContext";
import { Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, Collapse } from "reactstrap";


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
    <Navbar color="light" fixed="" expand="md">
      <NavbarBrand exact to="/">
        Jobly
      </NavbarBrand>
      <NavbarToggler />
      <Collapse navbar>
        {currentUser && (
          <Nav navbar>
            <NavItem>
              <NavLink exact to="/companies">
                Companies
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink exact to="/jobs">
                Jobs
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink exact to="/profile">
                Profile
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="NavLink" exact to="/" onClick={logout}>
                Log Out {currentUser.firstName}
              </NavLink>
            </NavItem>
          </Nav>
        )}
        {!currentUser && (
          <Nav navbar>
            <NavItem>
              <NavLink className="NavLink" exact to="/signup">
                Sign Up
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="NavLink" exact to="/login">
                Login
              </NavLink>
            </NavItem>
          </Nav>
        )}
      </Collapse>
    </Navbar>
  );
}

export default NavBar;
