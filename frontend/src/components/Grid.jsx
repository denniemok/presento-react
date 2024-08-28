import styled from 'styled-components';

const Grid = styled.div`

  display: grid;
  border-radius: 10px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  padding: 15px 0 0;
  gap: 20px;

  @media screen and (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  
`

export default Grid;
