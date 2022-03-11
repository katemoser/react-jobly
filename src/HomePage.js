import "./HomePage.css";
import { useContext } from "react";
import UserContext from "./userContext";
import { Link } from "react-router-dom";

/** HomePage component that displays different message if you are logged in or
 * logged out
 * 
 * props: none
 * 
 * state: none
 * 
 * context: User object with details
 *
 * App -> Routes -> HomePage - - - NLI - > {LogInForm, SignUpForm}
 */
 function HomePage(){

    console.log("HOMEPAGE RENDERED")
    const { currentUser } = useContext(UserContext);

     return (
         <div className="Jobly-HomePage">
             <h1>Jobly</h1>
             <h3>All the jobs in one, convenient place.</h3>
             {!currentUser && 
             <div>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up!</Link>
             </div>
             }
             
         </div>
     )
}

export default HomePage;