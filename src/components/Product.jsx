import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Image, Typography, Flex, theme } from 'antd';

const { Title } = Typography;

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
  const {
    token: { colorAccent },
  } = theme.useToken();

  return (
    <Wrapper>
      <Link to={`/products/${product.id}`}>
        <div
          style={{
            border: '1px solid #00000033',
            borderRadius: '8px',
            minHeight: '280px',
          }}
        >
          <Image
            preview={false}
            style={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}
            width={280}
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

              <Flex
                style={{ width: '100%' }}
                justify='center'
                gap={40}
                align='center'
              >
                <Title
                  level={5}
                  style={{
                    textDecoration: `${
                      product.event === 'DISCOUNT' ? 'line-through' : ''
                    }`,
                  }}
                >
                  {product.price.toLocaleString('ko-KR')}원
                </Title>
                {product.event === 'DISCOUNT' ? (
                  <Title level={4} style={{ color: colorAccent }}>
                    {(
                      (product.price * (100 - product.discountRate)) /
                      100
                    ).toLocaleString('ko-KR')}
                    원
                  </Title>
                ) : null}
              </Flex>
            </Flex>
          </div>
        </div>
      </Link>
    </Wrapper>
  );
};

export default Product;
