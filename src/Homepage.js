import React, { useContext } from 'react';
import CurrentUserContext from './CurrentUserContext';
import './HomePage.css';
import { NavLink } from 'react-router-dom'


/**
 * Homepage
 * 
 * State: None
 * Props: None
 * 
 * Routes --> Homepage
 */
function Homepage() {
  const currentUser = useContext(CurrentUserContext)
  return (
    <div className='HomePage'>
      <h1> Jobly </h1>
      <h6> All the jobs in one, convenient place</h6>
      {currentUser
        ? <h3> Welcome Back, {currentUser.username} </h3>
        :
        <div>
          <NavLink to='/login' className='btn btn-primary'> Login </NavLink>
          <NavLink to='/signup' className='btn btn-primary'> Signup </NavLink>
        </div>}
    </div>
  )
}
export default Homepage;