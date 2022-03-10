import {BrowserRouter} from "react-router-dom";
import './App.css';
import NavBar from "./NavBar";
import Routes from "./Routes";
import JoblyApi from "./api.js";
import {useState, useEffect} from "react";


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
  console.log(`APP: currentUser: ${currentUser}, token ${token}`);

  useEffect(function fetchUserWhenTokenChanges() {
    // const decodedToken = jwt.decode(token);
    const decodedToken="hello"
    console.log("Fetch decodedtoken", decodedToken);
    const username = decodedToken.username;
    
    async function fetchUser(username) {
      const userResult = await JoblyApi.getUser(username);
      console.log("App useEffect FetchUserWhenTokenChanges", userResult)
      setCurrentUser(userResult);
    }
    fetchUser(username);
  }, [token])
  
  function signup() {
    console.log("SIGNUP FUNCTION IN APP");
  }

  async function login(loginFormData) {
    console.log("LOGIN FUNCTION IN APP");
    const token = await JoblyApi.loginUser();
    setToken(token);
  }

  function editProfile() {
    console.log("EDIT PROFILE IN APP");
  }


  return (
    <div className="App">
    <BrowserRouter >
      <NavBar />
      <Routes signup={signup} login={login} editProfile={editProfile}/>
    </BrowserRouter>
    </div>
  );
}

export default App;
