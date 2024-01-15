import { BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import 'bootswatch/dist/minty/bootstrap.min.css';
import decode from "jwt-decode";

import './App.css';
import NavBar from "./NavBar";
import RoutesList from "./RoutesList.js";
import JoblyApi from "./api.js";
import UserContext from "./userContext";
import Loading from "./Loading.js";


// TODO: make globally accessible const for local storage token key name
/**
 * Jobly App -- A site for searching for job openings!
 *
 *  props: none
 *
 *  state:
 *  - currentUser : a user object and loaded flag like:
 *       {
 *          userdata: { username, firstName, lastName, isAdmin},
 *          infoLoaded: true }
 *
 *  - token : a jwt token string if user is logged in, otherwise null
 *
 * App -> {NavBar, Routes}
 */
function App() {
  const [currentUser, setCurrentUser] = useState({
    userData: null,
    infoLoaded: false
  });
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  /** Updates current user based on token */
  useEffect(function fetchUserWhenTokenChanges() {

    /** if token, gets user info from token. otherwise sets to null */
    async function getUser() {
      if (token) {
        const payload = decode(token);
        const username = payload.username;

        // Add token to API so it can be used on subsequent requests
        JoblyApi.token = token
        const userResult = await JoblyApi.getUser(username);
        setCurrentUser({
          userData: userResult,
          infoLoaded: true
        });
      } else {
        setCurrentUser({
          userData: null,
          infoLoaded: true
        });
      }
    }

    getUser();
  }, [token]);

  /** Signs up new user */
  async function signup(signupFormData) {
    const token = await JoblyApi.registerNewUser(signupFormData);
    localStorage.setItem("token", token);
    setToken(token);
  }

  /** Logs in new user */
  async function login(loginFormData) {
    const token = await JoblyApi.loginUser(loginFormData);
    localStorage.setItem("token", token);
    setToken(token);
  }

  /** Edits user profile */
  async function editProfile(editProfileFormData) {
    console.log("current user:", currentUser);
    const user = await JoblyApi.updateProfile(
      currentUser.userData.username,
      editProfileFormData
    );

    setCurrentUser({
      userData: user,
      infoLoaded: true
    });
  }

  /** Logs out user */
  async function logout() {
    await JoblyApi.logOutUser();
    localStorage.removeItem("token");
    setToken(null);
  }

  if (!currentUser.infoLoaded) return <Loading />;

  return (
    <div className="App">
      <UserContext.Provider value={{ currentUser: currentUser.userData }} >
        <BrowserRouter >
          <NavBar logout={logout} />
          <RoutesList
            signup={signup}
            login={login}
            editProfile={editProfile} />
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
