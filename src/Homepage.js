import React, { useContext } from 'react';
import CurrentUserContext from './CurrentUserContext';


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
  <div>
    {currentUser ? <h1> Welcome {currentUser.username} </h1>
    : <h1>HomePage </h1>}
  </div>
)
}
export default Homepage;