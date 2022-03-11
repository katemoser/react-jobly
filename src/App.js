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
 *  - token: a JWT token from API
 * 
 * App -> {NavBar, Routes}
 */
function App() {
  const [currentUser, setCurrentUser] = useState(null);

  let initialToken = null;

  console.log("LOCAL STORAGE", localStorage.getItem("token"));
  console.log("API TOKEN", JoblyApi.token);

  if(localStorage.getItem("token")){
    initialToken = localStorage.getItem("token");
    JoblyApi.token = initialToken
  }

  const [token, setToken] = useState(initialToken);


  console.log(`APP: currentUser: ${currentUser?.username}, token ${token}`);

  /** Updates current user based on token */
  useEffect(function fetchUserWhenTokenChanges() {
    console.log("APP EFFECT TOKEN", token)
    if (token !== null) {
      console.log("You shouldn't be here!", token);

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
  }, [token])

  /** Signs up new user */
  async function signup(signupFormData) {
    console.log("SIGNUP FUNCTION IN APP");
    const token = await JoblyApi.registerNewUser(signupFormData);
    localStorage.setItem("token", token);
    setToken(token);
  }

  // TODO: TRY CATCH FOR INCORRECT PW FOR BETTER UI
  /** Logs in new user */
  async function login(loginFormData) {
    console.log("LOGIN FUNCTION IN APP");
    const token = await JoblyApi.loginUser(loginFormData);
    localStorage.setItem("token", token);
    setToken(token);
  }

  /** Logs out user */
  function logout() {
    console.log("LOGOUT FUNCTION IN APP");
    JoblyApi.logOutUser();
    setToken(null);
    localStorage.removeItem("token");
  }

  /** TODO: DOESNT EXIST YET */
  function editProfile() {
    console.log("EDIT PROFILE IN APP");
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
