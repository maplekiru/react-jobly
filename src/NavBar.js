import { NavLink } from 'react-router-dom';
import React from 'react';
import './NavBar.css';

/**
 * NavBar
 * 
 * App --> NavBar
 */
// TODO: convert to React-BootStrap components
function NavBar({ localUser }) {

  return (
    <div className='navbar navbar-dark bg-dark NavBar'>
      <NavLink exact to='/'> Jobly </NavLink>
      {localUser ? <div>
        <NavLink to='/companies'> Companies </NavLink>
        <NavLink to='/jobs'> Jobs </NavLink>
        <NavLink to='/profile'> Profile </NavLink>
        <NavLink to='/logout'> LogOut {localUser.username} </NavLink>
      </div>
        : <div>
          <NavLink to='/login'> Login </NavLink>
          <NavLink to='/signup'> Signup </NavLink>
        </div>
      }
    </div>
  )
}

export default NavBar;
