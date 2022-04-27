import {Link} from "react-router-dom";

function ErrorMessage({error}){
    console.log("ERRORMESSAGE:", error);
    return(
        <div>
            <h1>Sorry, that didn't work...</h1>
            <Link to="/" >Go back to HomePage</Link>
        </div>
    )
}

export default ErrorMessage;