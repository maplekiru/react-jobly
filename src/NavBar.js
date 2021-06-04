import { NavLink, useHistory } from 'react-router-dom';
import React, { useContext } from "react";
import CurrentUserContext from "./CurrentUserContext";
import './NavBar.css';
import Button from 'react-bootstrap/Button'

/**
 * NavBar
 * Props: handleLogout
 * Context: currentUserContext
 * App --> NavBar
 */
function NavBar({ handleLogout }) {
  const currentUser = useContext(CurrentUserContext);

  const history = useHistory();

  function logout() {
    handleLogout();
    history.push('/');
  }

  return (
    <div className='navbar navbar-dark bg-dark NavBar'>
      <NavLink  id='logo' exact to='/'> <h4>Jobly </h4> </NavLink>
      {currentUser
        ? <div>
          <NavLink to='/companies'> Companies </NavLink>
          <NavLink to='/jobs'> Jobs </NavLink>
          <NavLink to='/profile'> Profile </NavLink>
          <Button variant='link' onClick={logout}> Log Out {currentUser.username} </Button>
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
