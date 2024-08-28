import styled from 'styled-components';

const ToolButton = styled.button`
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  color: black;
  background: white;
  // border: 1.5px solid #4CAF50;
  border: 1px solid #2196f3;
  border-radius: 8px;
  outline: 0;
  padding: 5px 10px;
  margin: 0 0 15px;
  cursor: pointer;

  &:hover:enabled, &:focus:enabled {
    // background: #4CAF50;
    background: #2196f3;
    color: white;
  }

  &:disabled {
    background: lightgrey;
    border-color: grey;
    cursor: initial;
  }

  @media screen and (max-width: 670px) {
    padding: 2px 5px;
    font-size: 10px;
  }
  
`

export default ToolButton;
