import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import CompaniesDataFetcher from "./CompaniesDataFetcher";
import JobsDataFetcher from "./JobsDataFetcher";
import CompanyDetail from "./CompanyDetail";
import HomePage from "./HomePage";
import Profile from "./Profile";
import Signup from "./Signup";
import LoginForm from "./LoginForm";

/**Routes component -- handles rendering for site based on url
 * 
 * props: None
 * 
 * state: none
 * 
 * App -> Routes -> {CompaniesDataFetcher, JobsDataFetcher, HomePage, Company Detail}
 */
function Routes({ signup, login, editProfile }){
    return (
       <Switch>
           <Route exact path="/login">
               <LoginForm handleLogin={login}/>
            </Route>
						<Route exact path="/signup">
               <Signup handleSignup={signup}/>
            </Route>
						<Route exact path="/profile">
               <Profile handleEditProfile={editProfile}/>
            </Route>
           <Route exact path="/companies">
               <CompaniesDataFetcher />
            </Route>
           <Route exact path="/jobs">
               <JobsDataFetcher />
            </Route>
           <Route exact path="/companies/:companyHandle">
               <CompanyDetail />
            </Route>
            <Route exact path="/">
               <HomePage />
            </Route>
            <Redirect to="/" />
       </Switch>
    )

}

export default Routes;