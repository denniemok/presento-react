import styled from 'styled-components';

const Box = styled.div`

  background: #FFFFFF;
  width: ${props => props.type === 'auth' ? '380px' : '80dvw'};
  margin: 0 auto 15px;
  padding: 40px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  box-sizing: border-box;

  p {
    margin: 0;
    color: #b3b3b3;
    font-size: 12px;
    text-align: center;
  }

`

export default Box;
