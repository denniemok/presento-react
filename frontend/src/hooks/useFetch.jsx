import React from 'react';

const BACKEND_PORT = require('../config.json').BACKEND_PORT;

function useFetch (path) {
  //
  const [response, setReponse] = React.useState(null);
  const [params, setParams] = React.useState(null);
  const [error, setError] = React.useState(null);
  //
  React.useEffect(async () => {
    const abortController = new AbortController();
    if (!params) return;
    try {
      const res = await fetch(`http://localhost:${BACKEND_PORT}${path}`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        signal: abortController.signal,
        ...params,
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      } else if (data.token) {
        console.log('POST requested');
        setReponse(data.token);
      } else if (data.store) {
        console.log('GET requested');
        if (data.store.data) {
          setReponse(data.store.data);
        } else {
          setReponse([]);
        }
      } else {
        console.log('PUT requested');
        setReponse([]); // still triggers a re-render
      }
    } catch (err) {
      if (err.name !== 'AbortError') alert(err.message);
      setError(err.message);
    }
    return () => abortController.abort();
  }, [path, params]);
  //
  return { response, setParams, error };
  //
}

export default useFetch;
