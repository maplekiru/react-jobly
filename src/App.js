import { BrowserRouter } from 'react-router-dom';
import React, { useState } from 'react'
import './App.css';
import Routes from './Routes'
import NavBar from './NavBar'

/**
 * App
 * 
 * State: localUser
 * 
 * functions: loginUser, signUpUser, updateProfile
 * 
 * App --> {Routes, NavBar} --> {HomePage, CompanyList, CompanyDetail
 *                     JobList, LoginForm, SignupForm, ProfileForm}
 */

function App() {
  const [localUser, setLocalUser] = useState(null);

  function handleLogin() { }
  function handleSignup() { }
  function handleProfile() { }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;

/**
 * App  Use app as state of truth
 * - BrowserRouter
 *
 *  JoblyApp                          Manages logged-in state/overall app
 *    state: localuser                      token of logged-in user or null
 *    props: None
 *    functions: Login, Signup, ProfileUpdate
 *
 *    NavBar                          Manages NavBar based on logged-in status
 *      props: localuser (one piece of state)
 *
 *    ***** Not Logged in Components *****
 *
 *    HomePage                        Shows NavLink to Login / Register (Use Nav bar to show links)
 *
 *      LoginForm                     Manages form to login
 *
 *      SignUpForm                    Manages form to register
 *
 *    ***** Logged in Components *****
 *
 *      *** General Use Components ***
 *
 *      Search Form <-- Companies, Jobs    Manages search for companies/jobs/users
 *        state: formData
 *        props: handleSearch
 *
 *      Job Card <-- Jobs, Company        Manages generating job card
 *        props: jobInfo, (user applied status???) use localuser
 *
 *      Base Card Component?? (Job Card, Company Card) and/ or
 *      Base Listing Component?? (Jobs, Companies)
 *
 *      Alert Component
 *
 *      ********************************
 *
 *    CompaniesList                       Manages generating list of companies
 *      state: search-term, companiesInfo
 *      functions: handleSearch
 *
 *      CompanyCard                   Manages generating company card for listing
 *        props: companyInfo
 *
 *      CompanyDetail                       Manages company page w/ job listings
 *        props: companyInfo
 *        state: jobs
 *
 *    JobsList                            Manages generating list of jobs
 *      state: jobsInfo
 *
 *    ProfileUpdateForm               Manages updating profile form (reusuable from register form???)
 *      props: updateProfileFunction
 *
 */

/**
 * TODO:
 * - Clean-up docstrings once state/props/heirachy is more clear
 * - Flesh out components and related API static methods
 * - Remember Keys on list items
 * - Pass functions down
 * - Add css
 */
