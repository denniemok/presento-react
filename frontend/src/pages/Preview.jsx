import React from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import Slide from '../components/Slide';
import ToolButton from '../components/ToolButton';

import useFetch from '../hooks/useFetch';

function Preview ({ token, resetToken }) {
  //
  const [store, setStore] = React.useState([]);
  //
  const params = useParams();
  const navigate = useNavigate();
  const getRequest = useFetch('/store');
  //
  const prsId = isNaN(params.prsId) ? 0 : parseInt(params.prsId) - 1; // offset, start from 0
  const sldId = isNaN(params.sldId) ? 0 : parseInt(params.sldId) - 1; // offset, start from 0
  //
  const previousSlideURL = `/preview/${prsId + 1}/${sldId - 1 + 1}` // offset
  const nextSlideURL = `/preview/${prsId + 1}/${sldId + 1 + 1}`; // offset
  //
  let prsBgColor = 'white';
  let sldBgColor = '';
  let numSlides = 0;
  let elems = [];
  //
  if (store) {
    if (store.at(prsId)) {
      prsBgColor = store[prsId].bgColor;
      sldBgColor = store[prsId].slideBgColor[sldId];
      numSlides = store[prsId].slide.length;
      elems = store[prsId].slide[sldId];
    }
  }
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
  React.useEffect(() => {
    if (getRequest.error) {
      resetToken();
    }
  }, [getRequest.error]) // reset token on every get request token error returned
  //
  React.useEffect(() => {
    getStore();
  }, []); // get on first render
  //
  React.useEffect(() => {
    setStore(getRequest.response);
  }, [getRequest.response]); // set store on first render and every get request returned
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
    <section id='preview'>
      <center>
        <ToolButton disabled={(numSlides < 2 && true) || (sldId === 0 && true)} onClick={() => navigate(previousSlideURL)}>←</ToolButton>&nbsp;
        <ToolButton disabled={(numSlides < 2 && true) || (sldId === numSlides - 1 && true)} onClick={() => navigate(nextSlideURL)}>→</ToolButton>
      </center>
      <Slide color={sldBgColor === '' ? prsBgColor : sldBgColor}>
        { elems.map((elem, idx) => { // element
          switch (elem.category) {
            case 'text':
              return (
                <div key={`elem-${idx}`} style={{
                  overflow: 'hidden',
                  fontSize: elem.fontSize + 'em',
                  fontFamily: elem.fontType,
                  color: elem.color,
                  width: elem.width + '%',
                  height: elem.height + '%',
                  position: 'absolute',
                  top: elem.top + '%',
                  left: elem.left + '%',
                }}>
                  {elem.content}
                </div>
              );
            case 'image':
              return (
                <div key={`elem-${idx}`} style={{
                  overflow: 'hidden',
                  width: elem.width + '%',
                  height: elem.height + '%',
                  position: 'absolute',
                  top: elem.top + '%',
                  left: elem.left + '%',
                }}>
                  <img src={elem.url} alt={elem.alt} />
                </div>
              );
            case 'video':
              return (
                <div key={`elem-${idx}`} style={{
                  overflow: 'hidden',
                  width: elem.width + '%',
                  height: elem.height + '%',
                  position: 'absolute',
                  top: elem.top + '%',
                  left: elem.left + '%',
                }}>
                  <iframe src={'https://www.youtube.com/embed/' + elem.url + '?autoplay=' + (elem.autoPlay ? '1' : '0')} />
                </div>
              );
            case 'code':
              return (
                <div key={`elem-${idx}`} style={{
                  overflow: 'hidden',
                  fontSize: elem.fontSize + 'em',
                  width: elem.width + '%',
                  height: elem.height + '%',
                  position: 'absolute',
                  top: elem.top + '%',
                  left: elem.left + '%',
                  whiteSpace: 'pre-wrap', // preserve line breaks and spaces
                }}>
                  {elem.content}
                </div>
              );
            default:
              return (<></>);
          }
        }) }
        <span style={{ // slide number
          fontSize: '1em',
          position: 'absolute',
          bottom: '1%',
          fontWeight: 'bold',
        }}>&nbsp;{sldId + 1}</span>
      </Slide>
    </section>
  );
}

export default Preview;
