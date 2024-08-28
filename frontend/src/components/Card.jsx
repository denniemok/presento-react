import styled from 'styled-components';

const Card = styled.div.attrs({ title: 'Click Me!' })`
  
  background: #eeeeee;
  border: 1px solid lightgrey;
  border-radius: 8px;
  box-shadow: 0 5px 10px rgba(0,0,0,0.2);
  box-sizing: border-box;
  aspect-ratio: 2/1;
  overflow: hidden;
  padding: 10px;
  text-align: center;

  &:hover {
    border-color: #3ca9e2;
  }

  div:nth-child(2) {
    font-size: 14px;
    font-weight: bold;
  }

  div:nth-child(1) {
    font-size: 10px;
    border-radius: 8px;
    background: grey;
    color: white;
    margin: 0 auto 10px;
    padding: 1px 5px;
    width: 50px;
  }

  div:nth-child(3) {
    font-size: 10px;
  }

`

export default Card;
