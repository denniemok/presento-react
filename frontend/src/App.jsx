import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './pages/Header';

import Login from './pages/Login';
import Register from './pages/Register';
import Logout from './pages/Logout'

import Dashboard from './pages/Dashboard';
import Preview from './pages/Preview';
import Edit from './pages/Edit';

import useToken from './hooks/useToken'
import Global from './components/Global';
import Footer from './pages/Footer';

function App () {
  //
  const { token, setAppToken, rvAppToken } = useToken();
  //
  return (
    <BrowserRouter>
      <Global />
      <Header token={token} />
      <Routes>
        <Route path='/' element={<Login token={token} setToken={setAppToken} />} />
        <Route path='/login' element={<Login token={token} setToken={setAppToken} />} />
        <Route path='/register' element={<Register token={token} setToken={setAppToken} />} />
        <Route path='/logout' element={<Logout token={token} resetToken={rvAppToken} />} />
        <Route path='/dashboard' element={<Dashboard token={token} resetToken={rvAppToken} />} />
        <Route path='/edit/:prsId/:sldId' element={<Edit token={token} resetToken={rvAppToken} />} />
        <Route path='/preview/:prsId/:sldId' element={<Preview token={token} resetToken={rvAppToken} />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
