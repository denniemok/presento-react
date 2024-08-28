import React from 'react';

function Footer ({ token }) {
  //
  if (window.location.pathname.includes('/preview/')) {
    return (<footer></footer>);
  }
  //
  return (
    <footer>
      <div style={{
        margin: '0 auto 15px',
        color: 'white',
        textAlign: 'center',
        borderRadius: '8px',
        background: 'grey',
        padding: '3px 10px',
        width: '180px',
        fontSize: '12px',
      }}>
        Presento by Dennie Mok
      </div>
    </footer>
  );
}

export default Footer;
