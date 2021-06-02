import { React, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';


const initialFormData = {
  firstName: '',
  lastName: '',
  username: '',
  password: '',
  email: ''
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

  /** Update form input. */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(fData => ({
      ...fData,
      [name]: value,
    }));
  }

  /** Call parent function and clear form. */
  function handleSubmit(evt) {
    evt.preventDefault();
    handleSignup(formData);
  }
  return (
    <Container>
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