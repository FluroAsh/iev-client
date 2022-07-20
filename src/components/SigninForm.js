import { Button, InputLabel, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../services/authServices';
import { useGlobalState } from '../context/stateContext';

const SigninForm = () => {
  const { dispatch } = useGlobalState();
  const navigate = useNavigate();

  const initialFormData = {
    email: '',
    password: '',
  };
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    signIn(formData).then((user) => {
      // console.log(user)
      if (user.error) {
        console.log('user.error', user.error);
        setError(user.error);
      } else {
        setError(null);
        sessionStorage.setItem('username', user.username);
        sessionStorage.setItem('token', user.jwt);
        dispatch({
          type: 'setLoggedInUser',
          data: user.username,
        });
        dispatch({
          type: 'setToken',
          data: user.jwt,
        });
        setFormData(initialFormData);
        navigate('/');
      }
    });
  };

  const handleFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  return (
    <>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <Typography variant="h4">Sign in</Typography>
        <div>
          <InputLabel>Email:</InputLabel>
          <TextField
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleFormData}
          />
        </div>
        <div>
          <InputLabel htmlFor="password">Password:</InputLabel>
          <TextField
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleFormData}
          />
        </div>

        <Button variant="contained" type="submit">
          Login
        </Button>
      </form>
    </>
  );
};

export default SigninForm;
