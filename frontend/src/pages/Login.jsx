import React from 'react';
import { Link, Navigate } from 'react-router-dom';

import Box from '../components/Box';
import Textbox from '../components/Textbox';
import Button from '../components/Button';

import useFetch from '../hooks/useFetch';

function Login ({ token, setToken }) {
  //
  const [form, setForm] = React.useState({
    email: '',
    password: '',
  });
  //
  const request = useFetch('/auth/login');
  //
  React.useEffect(() => {
    if (request.response) setToken(request.response);
  }, [request.response]); // to avoid infinite loop
  //
  function login () {
    request.setParams({
      body: JSON.stringify({
        email: form.email,
        password: form.password,
      }),
    });
  }
  //
  function handleEnter (e) {
    if (e.key === 'Enter') {
      login();
    }
  }
  //
  function handleChange (e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }
  //
  // if there is token in local storage, or is already logged in
  if (token) {
    return (<Navigate to='/dashboard' />);
  }
  //
  return (
    <Box id='login' type='auth'>
      <Textbox id='login-email' type='email' name='email' placeholder='Email' onChange={handleChange} onKeyDown={handleEnter} value={form.email} required />
      <Textbox id='login-password' type='password' name='password' placeholder='Password' onChange={handleChange} onKeyDown={handleEnter} value={form.password} required />
      <Button id='login-confirm' name='login' onClick={login}>Login</Button>
      <p>Not registered? <Link to='/register'>Create an account</Link>.</p>
    </Box>
  );
}

export default Login;
