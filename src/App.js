import { BrowserRouter } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import './App.css';
import Routes from './Routes'
import NavBar from './NavBar'
import 'bootstrap/dist/css/bootstrap.min.css';
import JoblyApi from './JoblyAPI';
import CurrentUserContext from "./CurrentUserContext";
import ApplyJobContext from "./ApplyJobContext";
import Spinner from 'react-bootstrap/Spinner';
const jwt = require("jsonwebtoken");


const initialToken = localStorage.getItem('joblyToken') || null;
/**
 * App
 * 
 * State: 
 *  - currentUser: { username, firstName, lastName, isAdmin, jobs }
 *    where jobs is [{ id, title, companyHandle, companyName, state }, ...]
 *  - token
 *  - isApiError
 * 
 * functions: loginUser, signUpUser, updateProfile
 * 
 * App --> {Routes, NavBar} --> {HomePage, CompanyList, CompanyDetail
 *                     JobList, LoginForm, SignupForm, ProfileForm} */
function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(initialToken);

  const initialLoading = initialToken ? true : false;
  const [isUserLoading, setIsUserLoading] = useState(initialLoading);

  console.log("APP", currentUser, token, isUserLoading);

  /** Accepts loginData {username, password}
   * Returns Token if authenticated */
  async function handleLogin(loginData) {
    try {
      const apiToken = await JoblyApi.login(loginData);
      setToken(apiToken);
      return { success: true, errors: null }
    } catch (errors) {
      return { success: false, errors: errors }
    }
  }

  /** Removes token and currentUser from state 
   * and removes token from local storage */
  function handleLogout() {
    setCurrentUser(null);
    setToken(null);
    localStorage.removeItem('joblyToken');
  }
  /** Accepts loginData {username, password}
   * Returns token if authenticated */
  async function handleSignup(signupData) {
    try {
      const apiToken = await JoblyApi.registerUser(signupData);
      setToken(apiToken);
      return { success: true, errors: null }
    } catch (errors) {
      return { success: false, errors: errors }
    }
  }

  /** On mount and token change -> update JoblyAPI token, 
   * local storage token, and currentUser */
  useEffect(function updateCurrentUser() {
    async function fetchCurrentUser() {
      try {
        const { username } = jwt.decode(token)
        JoblyApi.token = token;
        localStorage.setItem('joblyToken', token);
        setIsUserLoading(true);
        const currentUser = await JoblyApi.getUser(username);
        setCurrentUser(currentUser);
        setIsUserLoading(false);
      }
      catch {
        setCurrentUser(null);
        setIsUserLoading(false);
      }
    }
    if (token) fetchCurrentUser();
  }, [token])

  /** Accepts updateData {username, password, firstName, lastName, email}
  * Returns updated User info if successful */
  async function handleProfileUpdate(updateData) {
    try {
      const updateUser = await JoblyApi.updateUser(updateData);
      const currentUser = await JoblyApi.getUser(updateUser.username);
      setCurrentUser(currentUser);
      return { success: true, errors: null }
    } catch (errors) {
      return { success: false, errors: errors }
    }
  }

  async function handleApplyJob(username, jobId) {
    try {
      const jobApplied = await JoblyApi.applyToJob({username, jobId});
      setCurrentUser(currentUser => 
        ({...currentUser, applications: [...currentUser.applications, jobApplied] }));
      return { success: true, errors: null }
    } catch (errors) {
      return { success: false, errors: errors }
    }
  }

  if (isUserLoading) return <Spinner animation='border' variant='primary' />

  return (
    <div className="App">
      <BrowserRouter>
        <CurrentUserContext.Provider value={currentUser}>
          <NavBar handleLogout={handleLogout} />
          <ApplyJobContext.Provider value={handleApplyJob}>
          <Routes
            handleLogin={handleLogin}
            handleSignup={handleSignup}
            handleProfileUpdate={handleProfileUpdate}
          />
          </ApplyJobContext.Provider>
        </CurrentUserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;

/**
 * DRAFT 1 DESIGN NOTES
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
 * - Flesh out unapplying to job
 * - clean upp css and design
 */
