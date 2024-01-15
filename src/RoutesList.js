import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CompaniesDataFetcher from "./CompaniesDataFetcher";
import JobsDataFetcher from "./JobsDataFetcher";
import CompanyDetail from "./CompanyDetail";
import HomePage from "./HomePage";
// import Profile from "./Profile";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import UserContext from "./userContext";
import { useContext } from "react";
// import CompanyList from "./CompanyList";
import EditProfileForm from "./EditProfileForm";

/**Routes component -- handles rendering for site based on url
 *
 * props:
 *    - errors: an array of errors;
 *    - signup : parent function to register new user in API
 *    - login : parent function sign in user in API
 *    - editProfile : parent function to edit current user info in API
 *
 * state: none
 *
 * context:
 *    - currentUser : a user object
 *      ex. { username, firstName, lastName, isAdmin, jobs }
 *    where jobs is { id, title, companyHandle, companyName, state }
 *
 * App -> Routes -> {CompaniesDataFetcher, JobsDataFetcher, HomePage, Company Detail}
 */
function RoutesList({ signup, login, editProfile }) {

   const { currentUser } = useContext(UserContext);

   return (
      <Routes>

         {!currentUser &&

            <>
               <Route path="/login" element={<LoginForm handleLogin={login} />} />
               <Route path="/signup" element={<SignupForm handleSignup={signup} />} />
            </>

         }

         {currentUser &&
            <>
               <Route path="/companies" element={
                  <CompaniesDataFetcher />} />
               <Route path="/companies/:handle" element=
                  {<CompanyDetail />} />
               <Route path="/jobs" element={
                  <JobsDataFetcher />} />
               <Route path="/profile" element={
                  <EditProfileForm handleSaveChanges={editProfile} />} />
            </>
         }

         {/* <Route exact path="/login">
                     {currentUser ?
                        <Navigate to="/" /> :
                        <LoginForm handleLogin={login} />}
                  </Route>

                  <Route exact path="/signup">
                     {currentUser ?
                        <Navigate to="/" /> :
                        <SignupForm handleSignup={signup} />}
                  </Route> */}

         {/* <Route exact path="/profile">
            {currentUser ?
               <Profile handleEditProfile={editProfile} /> :
               <Navigate to="/login" />}
         </Route>

         <Route exact path="/companies">
            {currentUser ?
               <CompaniesDataFetcher /> :
               <Navigate to="/login" />}
         </Route>

         <Route exact path="/jobs">
            {currentUser ?
               <JobsDataFetcher /> :
               <Navigate to="/login" />}
         </Route>

         <Route exact path="/companies/:companyHandle">
            {currentUser ?
               <CompanyDetail /> :
               <Navigate to="/login" />}
         </Route> */}

         <Route path="/" element={<HomePage />} />

         <Route path="*" element={<Navigate to="/" />} />

      </Routes>
   );

}

export default RoutesList;