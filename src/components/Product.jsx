import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Image, Typography, Flex, Divider } from 'antd';

const { Title, Paragraph } = Typography;

const Wrapper = styled.div`
  margin: 8px 16px;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    scale: 1.05;
  }
`;

const Product = ({ product }) => {
  return (
    <Wrapper>
      <Link to={`/products/${product.id}`}>
        <div
          style={{
            border: '1px solid #00000033',
            borderRadius: '8px',
            minHeight: '240px',
          }}
        >
          <Image
            preview={false}
            style={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}
            width={200}
            src={`${product.images[0]}`}
          />
          <div>
            <Flex
              vertical
              justify='center'
              align='center'
              style={{ width: '100%' }}
            >
              <Title level={5} style={{ height: '24px' }}>
                {product.name}
              </Title>
              {/* </Flex> */}
              {/* <Flex vertical align='end' style={{ width: '100%' }}> */}

              <Title level={5}>{product.price.toLocaleString('ko-KR')}원</Title>
            </Flex>
          </div>
        </div>
      </Link>
    </Wrapper>
  );
};

export default Product;
