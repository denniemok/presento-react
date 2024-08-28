import React from 'react';
import { Link, Navigate } from 'react-router-dom';

import Box from '../components/Box';
import Textbox from '../components/Textbox';
import Button from '../components/Button';

import useFetch from '../hooks/useFetch';

function Register ({ token, setToken }) {
  //
  const [form, setForm] = React.useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })
  //
  const request = useFetch('/auth/register');
  //
  React.useEffect(() => {
    if (request.response) setToken(request.response);
  }, [request.response]); // to avoid infinite loop
  //
  function register () {
    if (form.password !== form.password2) {
      return alert('Passwords do not match!');
    }
    request.setParams({
      body: JSON.stringify({
        email: form.email,
        password: form.password,
        name: form.name,
      }),
    });
  }
  //
  function handleEnter (e) {
    if (e.key === 'Enter') {
      register();
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
  if (token) {
    return (<Navigate to='/dashboard' />);
  }
  //
  return (
    <Box id='register' type='auth'>
      <Textbox id='register-name' type='text' name='name' placeholder='Name' onChange={handleChange} onKeyDown={handleEnter} value={form.name} required />
      <Textbox id='register-email' type='email' name='email' placeholder='Email' onChange={handleChange} onKeyDown={handleEnter} value={form.email} required />
      <Textbox id='register-password' type='password' name='password' placeholder='Password' onChange={handleChange} onKeyDown={handleEnter} value={form.password} required />
      <Textbox id='register-password2' type='password' name='password2' placeholder='Confirm Password' onChange={handleChange} onKeyDown={handleEnter} value={form.password2} required />
      <Button id='register-confirm' name='register' onClick={register}>Register</Button>
      <p>Already registered? <Link to='/login'>Sign in</Link>.</p>
    </Box>
  );
}

export default Register;
