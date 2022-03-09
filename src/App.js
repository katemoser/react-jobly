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
  return (
    <div className="App">
    <BrowserRouter >
      <NavBar />
      <Routes />
    </BrowserRouter>
    </div>
  );
}

export default App;
