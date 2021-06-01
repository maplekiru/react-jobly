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
        Jobly
      </NavLink>
      <NavLink to='/jobs'>
        Jobly
      </NavLink>
      <NavLink to='/profile'>
        Jobly
      </NavLink>
      {/* <NavLink to='/logout'>
        Jobly
      </NavLink> */}
    </div>
  )
}

export default NavBar;
