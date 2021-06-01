import {NavLink} from 'react-router-dom';
import React from 'react';

/**
 * NavBar
 * 
 * App --> NavBar
 */
function NavBar(){

  return (
    <div className='NavBar'>
      <NavLink to='/'>
        Jobly
      </NavLink>
      <NavLink to='/companies'>
        Companies
      </NavLink>
      <NavLink to='/jobs'>
        Jobs
      </NavLink>
      <NavLink to='/login'>
        Login
      </NavLink>
      <NavLink to='/signup'>
        Signup
      </NavLink>
      <NavLink to='/profile'>
        Profile
      </NavLink>
      {/* <NavLink to='/logout'>
        Jobly
      </NavLink> */}
    </div>
  )
}

export default NavBar;
