import { BrowserRouter } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import './App.css';
import Routes from './Routes'
import NavBar from './NavBar'
import 'bootstrap/dist/css/bootstrap.min.css';
import JoblyApi from './JoblyAPI';
import CurrentUserContext from "./CurrentUserContext";
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
 *                     JobList, LoginForm, SignupForm, ProfileForm}
 */
function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(initialToken);

  /** Accepts loginData {username, password}
   * Returns Token if authenticated
   */
  async function handleLogin(formData) {
    try {
      const apiToken = await JoblyApi.login(formData);
      setToken(apiToken);
      return { success: true, errors: null }
    } catch (errors) {
      return { success: false, errors: errors }
    }
  }

  /** Removes token and currentUser from state */
  function handleLogout() {
    setCurrentUser(null);
    setToken(null);
    localStorage.removeItem('joblyToken')
  }
  /** Accepts loginData {username, password}
   * Returns token if authenticated
   */
  async function handleSignup(formData) {
    try {
      const apiToken = await JoblyApi.registerUser(formData);
      setToken(apiToken);
      return { success: true, errors: null }
    } catch (errors) {
      return { success: false, errors: errors }
    }
  }

  useEffect(function updateCurrentUser() {
    async function fetchCurrentUser() {
      if (token) {
        try {
          const { username } = jwt.decode(token)
          JoblyApi.token = token;
          localStorage.setItem('joblyToken', token);
          const localUser = await JoblyApi.getUser(username);
          setCurrentUser(localUser);
        }
        catch {
          setCurrentUser(null);
        }
      }
    }
    fetchCurrentUser();
  }, [token])


  function handleProfile() { }

  return (
    <div className="App">
      <BrowserRouter>
        <CurrentUserContext.Provider value={currentUser}>
          <NavBar handleLogout={handleLogout} />
          <Routes
            handleLogin={handleLogin}
            handleSignup={handleSignup}
            handleProfile={handleProfile}
          />
        </CurrentUserContext.Provider>
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
 * - Add token to localStorage
 * - Protect routes using Context of currentUser
 * - Flesh out components and related API static methods
 * - Add update Profile functionality
 * - Deploy
 * - Clean-up docStrings once state/props/hierarchy
 * - Add Loading message during API calls
 * - Add Alerts
 */
