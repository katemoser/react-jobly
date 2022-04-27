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
 * context:
 * - currentUser : a user object
 *      ex. { username, firstName, lastName, isAdmin, jobs }
 *    where jobs is { id, title, companyHandle, companyName, state }
 *
 * App -> Routes -> HomePage - - - NLI - > {LogInForm, SignUpForm}
 */
 function HomePage(){

    const { currentUser } = useContext(UserContext);

     return (
         <div className="Jobly-HomePage">
             <h1>Jobly</h1>
             <h3>All the jobs in one, convenient place.</h3>
             {!currentUser && 
             <div>
                <a href="/login">
                    <button>Login</button>
                </a>
                <a href="/signup">
                    <button>Sign Up!</button>
                </a>
             </div>
             }
             
         </div>
     )
}

export default HomePage;