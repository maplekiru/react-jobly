import { React, useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { useHistory, Redirect } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import CurrentUserContext from './CurrentUserContext'
import './LoginForm.css'

const initialFormData = {
  username: 'testuser',
  password: 'password',
}
/**
 * LoginForm
 * 
 * State: formData
 * Props: handleLogin
 * 
 * Routes --> LoginForm --> Alert
 */
function LoginForm({ handleLogin }) {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState(null)

  const currentUser = useContext(CurrentUserContext)
  const history = useHistory();

  console.log("Login Form", currentUser)

  /** Update form input. */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(fData => ({
      ...fData,
      [name]: value,
    }));
  }

  /** Call parent function and clear form. */
  async function handleSubmit(evt) {
    evt.preventDefault();
    const loginResult = await handleLogin(formData);
    if (loginResult.success) {
      history.push('/');
    }
    else {
      setErrors(loginResult.errors)
    }
  }

  if (currentUser) return <Redirect to='/' />

  return (
    <Container className='login-container'>
      {errors && errors.map((error, idx) => (
        <Alert key={idx} variant='danger'> {error} </Alert>))}
      <h2>Login</h2>
      <Form className='login-form' onSubmit={handleSubmit}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            onChange={handleChange}
            value={formData.username}
            aria-label="Username"
            required={true}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            aria-label="Password"
            required={true}
          />
        </Form.Group>
        <Button variant='primary' type='submit'> Submit</Button>
      </Form>
    </Container>
  )
}
export default LoginForm;