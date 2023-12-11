import React from 'react';
import { Image } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 8px 16px;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Product = ({ product }) => {
  return (
    <Wrapper>
      <Link to={`/products/${product.id}`}>
        <Image preview={false} width={200} src={`${product.images[0]}`} />
        <h3>{product.name}</h3>
        <p>{product.price.toLocaleString('ko-KR')}원</p>
      </Link>
    </Wrapper>
  );
};

export default Product;
