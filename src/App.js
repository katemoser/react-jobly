import { BrowserRouter } from "react-router-dom";
import './App.css';
import NavBar from "./NavBar";
import Routes from "./Routes";
import JoblyApi from "./api.js";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import UserContext from "./userContext";


/**
 * Jobly App -- A site for searching for job openings!
 * 
 *  props: none
 * 
 *  state: 
 *  - currentUser : a user object
 *      ex. { username, firstName, lastName, isAdmin, jobs }
 *    where jobs is { id, title, companyHandle, companyName, state }
 * 
 *  - isLoggedIn: boolean
 * 
 * App -> {NavBar, Routes}
 */
function App() {
  let initialToken = null;
  let isRemembered = false;

  if(localStorage.getItem("token")){
    initialToken = localStorage.getItem("token");
    isRemembered = true;
  }

  JoblyApi.token = initialToken // null or token stored in local storage

  
  const [currentUser, setCurrentUser] = useState(null);

  // console.log("LOCAL STORAGE", localStorage.getItem("token"));
  // console.log("API TOKEN", JoblyApi.token);
  
  const [isLoggedIn, setIsLoggedIn] = useState(isRemembered);

  console.log(`APP: currentUser: ${currentUser?.username}, token ${JoblyApi.token}`);

  /** Updates current user based on token */
  useEffect(function fetchUserWhenTokenChanges() {
    if (isLoggedIn) {
      const decodedToken = jwt_decode(JoblyApi.token);
      
      const username = decodedToken.username;

      async function fetchUser(username) {
        const userResult = await JoblyApi.getUser(username);
        console.log("App useEffect FetchUserWhenTokenChanges", userResult)
        setCurrentUser(userResult);
      }
      fetchUser(username);
    }
    else {
      setCurrentUser(null);
    }
  }, [isLoggedIn])

  /** Signs up new user */
  async function signup(signupFormData) {
    console.log("SIGNUP FUNCTION IN APP");
    const token = await JoblyApi.registerNewUser(signupFormData);
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
  }

  // TODO: TRY CATCH FOR INCORRECT PW FOR BETTER UI
  /** Logs in new user */
  async function login(loginFormData) {
    console.log("LOGIN FUNCTION IN APP");
    const token = await JoblyApi.loginUser(loginFormData);
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
  }

  /** TODO: DOESNT EXIST YET */
  async function editProfile(editProfileFormData) {
    console.log("EDIT PROFILE IN APP. formData:", editProfileFormData);
    const user = await JoblyApi.updateProfile(currentUser.username, editProfileFormData);
    setCurrentUser(user);
  }

  /** Logs out user */
  async function logout() {
    console.log("LOGOUT FUNCTION IN APP");
    await JoblyApi.logOutUser();
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  }

  console.log("CURRENT USER =", currentUser);

  return (
    <div className="App">
      <UserContext.Provider value={{ currentUser }} >
        <BrowserRouter >
          <NavBar logout={logout}/>
          <Routes signup={signup} login={login} editProfile={editProfile} />
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
