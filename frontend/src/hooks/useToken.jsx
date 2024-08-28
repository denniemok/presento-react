import React from 'react';

function useToken () {
  console.log('Token changed');
  //
  let initToken = null;
  if (localStorage.getItem('token')) {
    initToken = localStorage.getItem('token');
  }
  //
  const [token, setToken] = React.useState(initToken);
  //
  function setAppToken (tk) {
    localStorage.setItem('token', tk);
    setToken(tk);
  }
  //
  function rvAppToken () {
    localStorage.removeItem('token');
    setToken(null);
  }
  //
  return { token, setAppToken, rvAppToken };
  //
}

export default useToken;
