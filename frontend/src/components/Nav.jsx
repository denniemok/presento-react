import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  background: linear-gradient(to right, #34495e, #2c3e50);
  padding: 20px 45px;
  box-shadow: 0 5px 10px rgba(0,0,0,0.2);
  box-sizing: border-box;
  width: ${props => props.type === 'auth' ? '380px' : '80dvw'};
  margin: 0 auto 15px;
  .nav-title {
    flex: 2;
    font-weight: bold;
    color: white;
  }
  .nav-links {
    flex: 1;
    text-align: right;
  }
  a {
    font-size: 11px;
    color: white;
  }
`

export default Nav;
