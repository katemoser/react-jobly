import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import CompaniesDataFetcher from "./CompaniesDataFetcher";
import JobsDataFetcher from "./JobsDataFetcher";
import CompanyDetail from "./CompanyDetail";
import HomePage from "./HomePage";

/**Routes component -- handles rendering for site based on url
 * 
 * props: None
 * 
 * state: none
 * 
 * App -> Routes -> {CompaniesDataFetcher, JobsDataFetcher, HomePage, Company Detail}
 */
function Routes(){
    return (
       <Switch>
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