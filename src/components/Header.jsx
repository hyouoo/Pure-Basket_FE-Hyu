import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderComponent = styled.header`
  height: clamp(100px, 15vh, 150px);
  user-select: none;

  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 3rem;
  font-weight: bold;
`;

const Home = styled.a`
  color: ${(props) => props.theme.accentColor};
  font-weight: bold;
  cursor: pointer;
  position: absolute;
  left: 4px;

  span {
    font-size: 48px;
  }
`;

const Header = () => {
  return (
    <HeaderComponent>
      {/* {isHome?.isExact || ( */}
      <Home>
        <Link to="/">
          <img src="pure-basket-logo.png" alt="" />
          <span>Pure Basket</span>
        </Link>
      </Home>
      {/* )} */}
    </HeaderComponent>
  );
};

export default Header;
