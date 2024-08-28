import styled from 'styled-components';

const Deck = styled.div`

  background: #eeeeee;
  border: 1px solid lightgrey;
  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(0,0,0,0.2);
  padding: 20px;

  @media screen and (max-width: 600px) {
    border-radius: 0;
    padding: 0;
  }

`

export default Deck;
