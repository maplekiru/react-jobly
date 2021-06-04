import { React, useState, useContext } from 'react';
import { useHistory} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert'
import CurrentUserContext from './CurrentUserContext'
import './ProfileUpdateForm.css'

/**
 * ProfileForm
 * 
 * State: formData
 * Props: handleProfile
 * 
 * Routes --> ProfileUpdateForm --> Alert
 */
function ProfileUpdateForm({ handleProfileUpdate }) {

  const currentUser = useContext(CurrentUserContext);
  const { username, firstName, lastName, email } = currentUser;
  const initialFormData = { username, firstName, lastName, email, password: '' }

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState(null);

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
    const profileResult = await handleProfileUpdate(formData);
    if (profileResult.success) {
      history.push('/');
    }
    else {
      setErrors(profileResult.errors)
    }
  }

  console.assert(currentUser, "Should not have gotten here without current user");

  return (
    <Container className='profile-container'>
      {errors && errors.map((error, idx) => (
        <Alert key={idx} variant='danger'> {error} </Alert>))}
      <h2>Profile</h2>
      <Form className='profile-form' onSubmit={handleSubmit}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            plaintext
            readOnly
            defaultValue={formData.username}
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
export default ProfileUpdateForm;