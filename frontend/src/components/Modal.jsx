import styled from 'styled-components';

const Modal = styled.div`

  border: 5px solid #c4c7cd;
  background-color: white;
  padding: 15px 20px 0;
  width: 350px;
  position: absolute;
  top: 10dvh;
  left: calc((100dvw - 350px)/2);
  z-index: 2;
  box-shadow: rgba(100, 100, 100) 0px 0px 50px 10px;
  display: ${props => props.display};
  box-sizing: border-box;

  label {
    font-size: 10px;
  }
  
`

export default Modal;
