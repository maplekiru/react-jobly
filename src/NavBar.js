import { NavLink } from 'react-router-dom';
import React, { useContext } from "react";
import CurrentUserContext from "./CurrentUserContext";
import './NavBar.css';
import Button from 'react-bootstrap/Button'

/**
 * NavBar
 * Props: handleLogout
 * 
 * App --> NavBar
 */
// TODO: convert to React-BootStrap components
function NavBar({ handleLogout }) {
  const currentUser = useContext(CurrentUserContext)
  return (
    <div className='navbar navbar-dark bg-dark NavBar'>
      <NavLink exact to='/'> Jobly </NavLink>
      {currentUser ? <div>
        <NavLink to='/companies'> Companies </NavLink>
        <NavLink to='/jobs'> Jobs </NavLink>
        <NavLink to='/profile'> Profile </NavLink>
        <Button variant='link' onClick={handleLogout}> Log Out {currentUser.username} </Button>
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
