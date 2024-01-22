import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import UserContext from "./userContext";
import {
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  Collapse,
  NavbarText } from "reactstrap";


/**
 * NavBar for our site with links to homepage, companies, jobs, profile,
 *  and sign out if you are logged in
 *
 *  If you are logged out, then it will display links for
 * homepage, signup, and login
 *
 * props: logout function from parents
 *
 * State: isOpen : boolean, for toggling the hamburger menu on smaller screens
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

  const [isOpen, setIsOpen] = useState(false);

  console.log("navbar rendered, isOpen=", isOpen);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar className="NavBar" fixed="" expand="sm">
      <NavbarBrand href="/">
        LoopedIn
      </NavbarBrand>

      <NavbarToggler onClick={toggle} />
      {currentUser && (
        <Collapse isOpen={isOpen} navbar>

          <Nav navbar>
            <NavItem>
              <NavLink className="nav-link" to="/companies">
                Companies
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-link" to="/jobs">
                Jobs
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-link" to="/profile">
                Profile
              </NavLink>
            </NavItem>
          </Nav>
          <Nav navbar className="ms-auto">
            <NavItem >
              <NavbarText className="btn btn-secondary" onClick={logout}>
                Log Out {currentUser.firstName}
              </NavbarText>
            </NavItem>
          </Nav>
        </Collapse>

      )}

      {!currentUser && (
        <Collapse isOpen={isOpen} navbar>

          <Nav navbar className="ms-auto">
            <NavItem>
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-link" to="/signup">
                Sign Up
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>

      )}

    </Navbar>
  );
}

export default NavBar;
