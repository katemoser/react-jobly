import {BrowserRouter} from "react-router-dom";
import './App.css';
import NavBar from "./NavBar";
import Routes from "./Routes";

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
  
  function signup() {
    console.log("SIGNUP FUNCTION IN APP");
  }

  function login() {
    console.log("LOGIN FUNCTION IN APP");
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
