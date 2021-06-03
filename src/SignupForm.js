import { React, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert'


const initialFormData = {
  firstName: 'k',
  lastName: 'r',
  username: 'testkiru',
  password: 'password',
  email: 'k@r.com'
}
/**
 * SignupForm
 * 
 * State: formData
 * Props: handleSignup
 * 
 * Routes --> SignupForm --> Alert
 */
function SignupForm({ handleSignup }) {

  const [formData, setFormData] = useState(initialFormData);
  const [signupError, setSignupError] = useState(null);

  const history = useHistory();

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
    const signupResult = await handleSignup(formData);
    if (signupResult.success) {
      history.push('/');
    }
    else {
      setSignupError(signupResult.errors)
    }
  }
  return (
    <Container>
      {signupError && <Alert variant='danger'> {signupError}</Alert>} 
      <h2>Sign Up</h2>
      <Form onSubmit={handleSubmit}>
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
        <Form.Group controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            onChange={handleChange}
            value={formData.firstName}
            aria-label="First Name"
            required={true}
          />
        </Form.Group>
        <Form.Group controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            onChange={handleChange}
            value={formData.lastName}
            aria-label="Last Name"
            required={true}
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            aria-label="Email"
            required={true}
          />
        </Form.Group>
        <Button variant='primary' type='submit'> Submit!</Button>
      </Form>
    </Container>
  )
}
export default SignupForm;