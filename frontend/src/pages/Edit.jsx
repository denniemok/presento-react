import React from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import AddText from '../modals/AddText';
import AddImage from '../modals/AddImage';
import AddVideo from '../modals/AddVideo';
import AddCode from '../modals/AddCode';
import DeletePrs from '../modals/DeletePrs';
import EditTitle from '../modals/EditTitle';
import EditTheme from '../modals/EditTheme';

import Box from '../components/Box';
import Deck from '../components/Deck';
import Slide from '../components/Slide';
import ToolButton from '../components/ToolButton';

import useFetch from '../hooks/useFetch';

export const EditContext = React.createContext();

function Edit ({ token, resetToken }) {
  //
  const [store, setStore] = React.useState(null);
  const [isLeave, setIsLeave] = React.useState(false);
  const [display, setDisplay] = React.useState({
    delete: 'none',
    editTitle: 'none',
    editTheme: 'none',
    addText: 'none',
    addImage: 'none',
    addVideo: 'none',
    addCode: 'none',
  });
  //
  const params = useParams();
  const navigate = useNavigate();
  const getRequest = useFetch('/store');
  const putRequest = useFetch('/store');
  //
  const prsId = isNaN(params.prsId) ? 0 : parseInt(params.prsId) - 1; // offset, start from 0
  const sldId = isNaN(params.sldId) ? 0 : parseInt(params.sldId) - 1; // offset, start from 0
  //
  const previousSlideURL = `/edit/${prsId + 1}/${sldId - 1 + 1}` // offset
  const nextSlideURL = `/edit/${prsId + 1}/${sldId + 1 + 1}`; // offset
  //
  let prsTitle = '';
  let prsDesc = '';
  let prsBgColor = 'white';
  let sldBgColor = '';
  let numSlides = 0;
  let elems = [];
  //
  if (store) {
    if (store.at(prsId)) {
      prsTitle = store[prsId].title;
      prsDesc = store[prsId].desc;
      prsBgColor = store[prsId].bgColor;
      sldBgColor = store[prsId].slideBgColor[sldId];
      numSlides = store[prsId].slide.length;
      elems = store[prsId].slide[sldId];
    }
  }
  //
  const elemStyle = {
    overflow: 'hidden',
    border: '1px solid #c4c7cd',
    position: 'absolute',
  };
  //
  const slideNumberStyle = {
    fontSize: '1em',
    position: 'absolute',
    bottom: '1%',
    fontWeight: 'bold',
  };
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
  function putStore (object, leave) {
    if (leave) setIsLeave(true);
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
    if (isLeave) {
      navigate('/dashboard');
    } else {
      getStore();
    }
  }, [putRequest.response]); // get on first render and every put request returned
  //
  React.useEffect(() => {
    setStore(getRequest.response);
  }, [getRequest.response]); // set store on first render and every get request returned
  //
  function createSlide () {
    const newStore = [...store];
    newStore[prsId].slide.push([]);
    newStore[prsId].slideBgColor.push('');
    putStore(newStore, false);
  }
  //
  function deleteSlide () {
    if (numSlides === 1) {
      setDisplay({ ...display, delete: 'block' }); // delete presentation
      return;
    }
    const newStore = [...store];
    newStore[prsId].slide.splice(sldId, 1);
    newStore[prsId].slideBgColor.splice(sldId, 1);
    if (sldId !== 0) navigate(previousSlideURL); // redirect to previous slide
    putStore(newStore, false);
  }
  //
  function deleteElem (e, elemId) {
    e.preventDefault();
    const newStore = [...store];
    newStore[prsId].slide[sldId].splice(elemId, 1);
    putStore(newStore, false);
  }
  //
  window.onkeydown = (e) => {
    if (numSlides < 2) return;
    if (e.key === 'ArrowLeft' && sldId !== 0) {
      navigate(previousSlideURL);
    }
    if (e.code === 'ArrowRight' && sldId !== numSlides - 1) {
      navigate(nextSlideURL);
    }
  }
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
    <Box id='editor' type='app'>
      { store.length === 0 && (<center>There are no presentations for this account at the moment.</center>) }
      { store.length !== 0 && (
      <React.Fragment>
        <EditContext.Provider value={{ store, putStore, prsId, sldId, display, setDisplay, prsTitle, prsDesc, prsBgColor, sldBgColor }}>
          <DeletePrs />
          <EditTitle />
          <EditTheme />
          <AddText />
          <AddImage />
          <AddVideo />
          <AddCode />
        </EditContext.Provider>
        <center>
          <h3>ID: {prsId + 1} | Title: {prsTitle} | {numSlides} Slides</h3>
          <ToolButton onClick={() => navigate('/dashboard')}>Back</ToolButton>&nbsp;
          <ToolButton onClick={() => setDisplay({ ...display, delete: 'block' })}>Delete Presentation</ToolButton>&nbsp;
          <ToolButton onClick={() => setDisplay({ ...display, editTitle: 'block' })}>Edit Title</ToolButton>&nbsp;
          <ToolButton onClick={() => setDisplay({ ...display, editTheme: 'block' })}>Edit Theme</ToolButton>&nbsp;
          <ToolButton onClick={() => window.open(`/preview/${prsId + 1}/${sldId + 1}`, '_blank', 'rel=noopener noreferrer')}>Preview</ToolButton>
          <br />
          <ToolButton disabled={(numSlides < 2 && true) || (sldId === 0 && true)} onClick={() => navigate(previousSlideURL)}>←</ToolButton>&nbsp;
          <ToolButton disabled={(numSlides < 2 && true) || (sldId === numSlides - 1 && true)} onClick={() => navigate(nextSlideURL)}>→</ToolButton>&nbsp;
          <ToolButton onClick={() => createSlide()}>Create Slide</ToolButton>&nbsp;
          <ToolButton onClick={() => deleteSlide()}>Delete Slide</ToolButton>&nbsp;
          <ToolButton onClick={() => setDisplay({ ...display, addText: 'block' })}>Add Text</ToolButton>&nbsp;
          <ToolButton onClick={() => setDisplay({ ...display, addImage: 'block' })}>Add Image</ToolButton>&nbsp;
          <ToolButton onClick={() => setDisplay({ ...display, addVideo: 'block' })}>Add Video</ToolButton>&nbsp;
          <ToolButton onClick={() => setDisplay({ ...display, addCode: 'block' })}>Add Code</ToolButton>
        </center>
        <Deck>
          <Slide color={sldBgColor === '' ? prsBgColor : sldBgColor}>
            { elems.map((elem, idx) => { // element
              switch (elem.category) {
                case 'text':
                  return (
                    <div key={`elem-${idx}`} style={{
                      ...elemStyle,
                      fontSize: elem.fontSize + 'em',
                      fontFamily: elem.fontType,
                      color: elem.color,
                      width: elem.width + '%',
                      height: elem.height + '%',
                      top: elem.top + '%',
                      left: elem.left + '%',
                    }} onContextMenu={e => deleteElem(e, idx)}>
                      {elem.content}
                    </div>
                  );
                case 'image':
                  return (
                    <div key={`elem-${idx}`} style={{
                      ...elemStyle,
                      width: elem.width + '%',
                      height: elem.height + '%',
                      top: elem.top + '%',
                      left: elem.left + '%',
                    }} onContextMenu={e => deleteElem(e, idx)}>
                      <img src={elem.url} alt={elem.alt} />
                    </div>
                  );
                case 'video':
                  return (
                    <div key={`elem-${idx}`} style={{
                      ...elemStyle,
                      width: elem.width + '%',
                      height: elem.height + '%',
                      top: elem.top + '%',
                      left: elem.left + '%',
                    }} onContextMenu={e => deleteElem(e, idx)}>
                      <iframe src={'https://www.youtube.com/embed/' + elem.url + '?autoplay=' + (elem.autoPlay ? '1' : '0')} />
                    </div>
                  );
                case 'code':
                  return (
                    <div key={`elem-${idx}`} style={{
                      ...elemStyle,
                      fontSize: elem.fontSize + 'em',
                      width: elem.width + '%',
                      height: elem.height + '%',
                      top: elem.top + '%',
                      left: elem.left + '%',
                      whiteSpace: 'pre-wrap', // preserve line breaks and spaces
                    }} onContextMenu={e => deleteElem(e, idx)}>
                      {elem.content}
                    </div>
                  );
                default:
                  return (<></>);
              }
            }) }
            <span style={slideNumberStyle}>&nbsp;{sldId + 1}</span>
          </Slide>
        </Deck>
      </React.Fragment>
      ) }
    </Box>
  );
}

export default Edit;
