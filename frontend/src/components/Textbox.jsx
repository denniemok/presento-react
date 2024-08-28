import styled from 'styled-components';

const Textbox = styled.input`
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  background: #f2f2f2;
  width: 100%;
  border: 1px solid #f2f2f2;
  outline: 0;
  margin: 0 0 15px;
  padding: 14px;
  box-sizing: border-box;
  display: block;
  &:focus {
    border: 1px solid #3ca9e2;
  }
  &:focus:invalid {
    color: #cc1e2b;
    border-color: #cc1e2b;
  }
`

export default Textbox;
