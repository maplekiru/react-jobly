import { NavLink } from 'react-router-dom';
import React from 'react';
import './NavBar.css';

/**
 * NavBar
 * 
 * App --> NavBar
 */
// add nav css
function NavBar() {

  return (
    <div className='navbar navbar-dark bg-dark NavBar'>
      <NavLink exact to='/'> Jobly </NavLink>
      <NavLink to='/companies'> Companies </NavLink>
      <NavLink to='/jobs'> Jobs </NavLink>
      <NavLink to='/login'> Login </NavLink>
      <NavLink to='/signup'> Signup </NavLink>
      <NavLink to='/profile'> Profile </NavLink>
      {/* <NavLink to='/logout'>
        Jobly
      </NavLink> */}
    </div>
  )
}

export default NavBar;
