import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import Nav from '../components/Nav';

function Header ({ token }) {
  //
  const { pathname } = useLocation();
  //
  if (pathname.includes('/preview/')) {
    return (<header></header>);
  }
  //
  if (token) {
    return (
      <header>
        <Nav id='nav-bar' type='app'>
          <div className='nav-title'>Presento</div>
            <div className='nav-links'>
              <Link to='/dashboard'>Dashboard</Link>&nbsp;&nbsp;&nbsp;&nbsp;
              <Link to='/logout'>Logout</Link>
          </div>
        </Nav>
      </header>
    );
  }
  //
  return (
    <header>
      <Nav id='nav-bar' type='auth'>
        <div className='nav-title'>Presento</div>
          <div className='nav-links'>
            <Link to='/login'>Login</Link>&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to='/register'>Register</Link>
        </div>
      </Nav>
    </header>
  );
}

export default Header;
