import React from 'react';
import { Navigate } from 'react-router-dom';

import useFetch from '../hooks/useFetch';

function Logout ({ token, resetToken }) {
  //
  const request = useFetch('/auth/logout');
  //
  React.useEffect(() => {
    request.setParams({
      headers: {
        'Content-type': 'application/json',
        Authorization: token,
      },
    });
  }, []);
  //
  React.useEffect(() => {
    if (request.response || request.error) resetToken();
  }, [request.response, request.error]); // logout regardless of error or not
  //
  if (!token) {
    return (<Navigate to='/login' />);
  }
  //
  return (<></>);
}

export default Logout;
