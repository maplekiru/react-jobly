import { React, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';

const initialFormData = {
  username: '',
  password: '',
}
/**
 * LoginForm
 * 
 * State: formData
 * Props: handleLogin
 * 
 * Routes --> LoginForm --> Alert
 */
function LoginForm({handleLogin}) {
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
    handleLogin(formData);
  }
  return (
    <Container>
      <h2>Login</h2>
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
        <Button variant='primary' type='submit'> Submit!</Button>
      </Form>
    </Container>
  )
}
export default LoginForm;