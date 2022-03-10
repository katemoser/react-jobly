import {BrowserRouter} from "react-router-dom";
import './App.css';
import NavBar from "./NavBar";
import Routes from "./Routes";
import JoblyApi from "./api.js";
import {useState} from "react";

/**
 * Jobly App -- A site for searching for job openings!
 * 
 *  props: none
 * 
 * state: none
 * 
 * App -> {NavBar, Routes}
 */
function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);
  console.log(`APP: currentUser: ${currentUser}, token ${token}`);
  
  function signup() {
    console.log("SIGNUP FUNCTION IN APP");
  }

  async function login(loginFormData) {
    console.log("LOGIN FUNCTION IN APP");

    const token = await JoblyApi.loginUser();
    const user = await JoblyApi.getUser(loginFormData.username);
    setCurrentUser(user);
    setToken(token);
  }

  function editProfile() {
    console.log("EDIT PROFILE IN APP");
  }

  function applyToJob() {
    console.log("APPLY TO JOB IN APP");
  }


  return (
    <div className="App">
    <BrowserRouter >
      <NavBar />
      <Routes signup={signup} login={login} editProfile={editProfile} applyToJob={applyToJob}/>
    </BrowserRouter>
    </div>
  );
}

export default App;
