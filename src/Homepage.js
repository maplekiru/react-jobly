import React from 'react';


/**
 * Homepage
 * 
 * State: None
 * Props: None
 * 
 * Routes --> Homepage
 */
function Homepage({localUser}) {
return (
  <div>
    {localUser ? <h1> Welcome {localUser.username} </h1>
    : <h1>HomePage </h1>}
  </div>
)
}
export default Homepage;