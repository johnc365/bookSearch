import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/queries';
import { Form, Button, Alert } from 'react-bootstrap';
import Auth from '../utils/auth';
import { useNavigate } from 'react-router-dom';

// LoginForm component
export const LoginForm = () => {
  const navigate = useNavigate();
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [loginUser] = useMutation(LOGIN_USER);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();
    setValidated(true);

    if (!userFormData.email || !userFormData.password) {
      return;
    }

    try {
      const { data } = await loginUser({
        variables: { ...userFormData },
      });

      Auth.login(data.login.token);
      navigate('/');
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({ email: '', password: '' });
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your login!
        </Alert>

        <Form.Group>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your email address'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        <Button disabled={!(userFormData.email && userFormData.password)} type='submit' variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
};