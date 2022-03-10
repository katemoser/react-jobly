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
 *  state: none
 * 
 * App -> {NavBar, Routes}
 */
function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);


  console.log(`APP: currentUser: ${currentUser?.username}, token ${token}`);

  useEffect(function fetchUserWhenTokenChanges() {
    const decodedToken = jwt_decode(JoblyApi.token);
    console.log("Fetch decodedtoken", decodedToken);
    const username = decodedToken.username;

    async function fetchUser(username) {
      const userResult = await JoblyApi.getUser(username);
      console.log("App useEffect FetchUserWhenTokenChanges", userResult)
      setCurrentUser(userResult);
    }
    fetchUser(username);
  }, [token])

  async function signup(signupFormData) {
    console.log("SIGNUP FUNCTION IN APP");
    const token = await JoblyApi.registerNewUser(signupFormData);
    setToken(token);
  }

  async function login(loginFormData) {
    console.log("LOGIN FUNCTION IN APP");
    const token = await JoblyApi.loginUser(loginFormData);
    setToken(token);
  }

  function editProfile() {
    console.log("EDIT PROFILE IN APP");
  }


  return (
    <div className="App">
      <UserContext.Provider value={{currentUser}} >
        <BrowserRouter >
          <NavBar />
          <Routes signup={signup} login={login} editProfile={editProfile} />
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
