import styled from 'styled-components';

export const CartItemRoot = styled.div`
  position: relative;
  border: 2px solid gainsboro;
  border-radius: 20px;
  background-color: whitesmoke;
  box-sizing: border-box;
  width: 550px;
  display: flex;
  flex-direction: row;
  overflow: hidden;
`;

export const CartItem = styled.div`
  position: relative;
  width: 100%;
  height: 120px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const Info = styled.div`
  flex-grow: 3;
  height: 110px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export const ProductImage = styled.img`
  margin: 16px;
  width: 100px;
  height: 100px;
  border-radius: 8px;
`;

export const ProductName = styled.div`
  font-size: 20px;
`;

export const Price = styled.div`
  flex-basis: 100px;
  font-size: 15px;
`;

export const TotalPrice = styled.p`
  font-size: 20px;
  flex-grow: 1;
`;
