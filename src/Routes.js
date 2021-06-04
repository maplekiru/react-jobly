import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Homepage from './Homepage';
import CompanyList from './CompanyList';
import CompanyDetail from './CompanyDetail';
import JobList from './JobList';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import ProfileUpdateForm from './ProfileUpdateForm';
import PrivateRoute from './PrivateRoute'

/**
 * Routes
 * 
 * Props: handleSignUp, handleLogin, handleProfile
 * 
 * App --> Routes --> {HomePage, CompanyList, CompanyDetail
 *                     JobList, LoginForm, SignupForm, ProfileForm}
 */

//TODO: do security requirement do that route
function Routes({ handleSignup, handleLogin, handleProfileUpdate }) {
  
  console.log("ROUTES")
  return (
    <Switch>
      <Route exact path='/'>
        <Homepage />
      </Route>
      <PrivateRoute exact path='/companies' component={<CompanyList />} />
      <PrivateRoute exact path='/companies/:name' component={<CompanyDetail />} />
      <PrivateRoute exact path='/jobs' component={<JobList />} />
      <PrivateRoute exact path='/profile'
        component={<ProfileUpdateForm
          handleProfileUpdate={handleProfileUpdate} />} />
      <Route exact path='/login'>
        <LoginForm handleLogin={handleLogin} />
      </Route>
      <Route exact path='/signup'>
        <SignupForm handleSignup={handleSignup} />
      </Route>
      <Redirect to='/' />
    </Switch>
  )
}

export default Routes

