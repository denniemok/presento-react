import styled from 'styled-components';

const Slide = styled.div`
  background: ${props => props.color};
  aspect-ratio: 2/1;
  position: relative;
  overflow: hidden;
  border: 1px solid lightgrey;
`

export default Slide;
