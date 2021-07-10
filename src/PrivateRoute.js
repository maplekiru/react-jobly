import { Redirect, Route } from 'react-router-dom';
import { useContext } from 'react';
import CurrentUserContext from './CurrentUserContext'

/**
 * Accepts {path: '/path', component: <Component/>}
 * Returns Route if logged in, or redirects to login route
 */
function PrivateRoute({ path, component }) {

  const currentUser = useContext(CurrentUserContext)

  return (currentUser
    ? <Route exact path={path} >
      {component}
    </Route>
    : <Redirect to='/login' />)
}

export default PrivateRoute

// TODO: useChildren props vs. component