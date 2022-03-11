import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import CompaniesDataFetcher from "./CompaniesDataFetcher";
import JobsDataFetcher from "./JobsDataFetcher";
import CompanyDetail from "./CompanyDetail";
import HomePage from "./HomePage";
import Profile from "./Profile";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import UserContext from "./userContext";
import { useContext } from "react";

/**Routes component -- handles rendering for site based on url
 * 
 * props: None
 * 
 * state: none
 * 
 * App -> Routes -> {CompaniesDataFetcher, JobsDataFetcher, HomePage, Company Detail}
 */
function Routes({ signup, login, editProfile }) {

   const { currentUser } = useContext(UserContext);
   console.log("ROUTES CURRENT USER", currentUser);

   return (
      <Switch>
         <Route exact path="/login">
            {currentUser ?
               <Redirect to="/" /> :
               <LoginForm handleLogin={login} />}
         </Route>

         <Route exact path="/signup">
            {currentUser ?
               <Redirect to="/" /> :
               <SignupForm handleSignup={signup} />}
         </Route>

         <Route exact path="/profile">
            {currentUser ?
               <Profile handleEditProfile={editProfile} /> :
               <Redirect to="/login" />}
         </Route>

         <Route exact path="/companies">
            {currentUser ?
               <CompaniesDataFetcher /> :
               <Redirect to="/login" />}
         </Route>

         <Route exact path="/jobs">
            {currentUser ?
               <JobsDataFetcher /> :
               <Redirect to="/login" />}
         </Route>

         <Route exact path="/companies/:companyHandle">
            {currentUser ?
               <CompanyDetail /> :
               <Redirect to="/login" />}
         </Route>

         <Route exact path="/">
            <HomePage />
         </Route>

         <Redirect to="/" />
      </Switch>
   )

}

export default Routes;