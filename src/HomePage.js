import "./HomePage.css";
import { useContext } from "react";
import UserContext from "./userContext";

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
function HomePage() {

    const { currentUser } = useContext(UserContext);

    return (
        <div className="Jobly-HomePage">
            <h1>Jobly</h1>
            <h3>All the jobs in one, convenient place.</h3>
            {!currentUser &&
                <div>
                    <a href="/login">
                        <button className="btn btn-primary btn-lg">Login</button>
                    </a>
                    <a href="/signup">
                        <button className="btn btn-primary btn-lg">Sign Up!</button>
                    </a>
                </div>
            }

        </div>
    );
}

export default HomePage;