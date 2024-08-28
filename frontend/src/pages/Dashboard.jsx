import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import Box from '../components/Box';
import Card from '../components/Card';
import Button from '../components/Button';
import Grid from '../components/Grid';

import CreatePrs from '../modals/CreatePrs';

import useFetch from '../hooks/useFetch';

export const NewContext = React.createContext();

function Dashboard ({ token, resetToken }) {
  //
  const [store, setStore] = React.useState(null);
  //
  const [display, setDisplay] = React.useState('none');
  //
  const navigate = useNavigate();
  const getRequest = useFetch('/store');
  const putRequest = useFetch('/store');
  //
  function getStore () {
    getRequest.setParams({
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: token
      }
    });
  }
  //
  function putStore (object) {
    putRequest.setParams({
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: token
      },
      body: JSON.stringify({
        store: { data: object }
      })
    });
  }
  //
  React.useEffect(() => {
    if (putRequest.error === 'Invalid Token') {
      resetToken();
    }
  }, [putRequest.error]) // reset token on every put request token error returned
  //
  React.useEffect(() => {
    if (getRequest.error === 'Invalid Token') {
      resetToken();
    }
  }, [getRequest.error]) // reset token on every get request token error returned
  //
  React.useEffect(() => {
    getStore();
  }, [putRequest.response]); // get on first render and every put request returned
  //
  React.useEffect(() => {
    setStore(getRequest.response);
  }, [getRequest.response]); // set store on first render and every get request returned
  //
  if (!token) {
    return (<Navigate to='/login' />);
  }
  //
  if (!store) {
    return (<center>Loading...</center>);
  }
  //
  return (
    <Box id='dashboard' type='app'>
      <NewContext.Provider value={{ display, setDisplay, store, putStore }}>
        <CreatePrs />
      </NewContext.Provider>
      <center>
        <Button id='btnNewPrs' style={{ width: '40%' }} onClick={() => setDisplay('block')}>New Presentation</Button>
      </center>
      { store.length === 0 && (
        <center>There are no presentations for this account at the moment.</center>
      ) }
      { store.length !== 0 && (
        <Grid>
          { store.map((prs, prsId) => (
            <Card key={`card-${prsId + 1}`} onClick={() => navigate(`/edit/${prsId + 1}/1`)}>
              <div>{prs.slide.length} Slides</div>
              <div>{prs.title}</div>
              <div>{prs.desc}</div>
            </Card>
          )) }
        </Grid>
      ) }
    </Box>
  );
}

export default Dashboard;
