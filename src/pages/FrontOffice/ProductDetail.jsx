import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { createJwtInstance, defaultInstance } from '../../network/axios';
import { useRecoilValue } from 'recoil';
import { userState } from '../../recoil/atoms';
import {
  Typography,
  Flex,
  Image,
  Divider,
  Button,
  InputNumber,
  theme,
} from 'antd';

const { Title, Paragraph } = Typography;

const ProductDetail = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [amount, setAmount] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useRecoilValue(userState);
  const jwtInstance = createJwtInstance(token);

  const fetchData = async (page = 1) => {
    const { data } = await defaultInstance.get(`/products/${productId}`);
    setProduct(data);
    setIsLoading(false);
  };

  const {
    token: { colorAccent },
  } = theme.useToken();

  const onChange = (value) => {
    setAmount(value);
  };

  const handlePurchase = async () => {
    await jwtInstance.post(`/purchases`, {
      purchaseList: [{ productId, amount }],
    });
    navigate('/order-complete');
  };

  const handleAddToCart = async () => {
    await jwtInstance.post(`/carts/${productId}`, { amount });
    navigate('/carts');
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    isLoading || (
      <>
        <Flex gap={80}>
          <section>
            <Flex gap='middle' vertical>
              {product.images.map((image, i) => {
                return (
                  <Image
                    key={image + i}
                    preview={false}
                    width={500}
                    src={`${image}`}
                    style={{ borderRadius: '8px' }}
                  />
                );
              })}
            </Flex>
          </section>
          <section>
            <Title level={3}>{product.name}</Title>
            <Divider />

            <Title
              level={4}
              style={{
                textDecoration: `${
                  product.event === 'DISCOUNT' ? 'line-through' : ''
                }`,
              }}
            >
              {product.price.toLocaleString('ko-KR')} <span>원</span>
            </Title>
            {product.event === 'DISCOUNT' ? (
              <Title level={3} style={{ color: colorAccent }}>
                {(
                  (product.price * (100 - product.discountRate)) /
                  100
                ).toLocaleString('ko-KR')}
                원
              </Title>
            ) : null}

            <Title level={4}></Title>
            <Paragraph>{product.info}</Paragraph>

            <Flex justify='space-between' gap={16}>
              <InputNumber
                min={1}
                max={product.stock}
                defaultValue={amount}
                onChange={onChange}
              />

              <Title level={4}>
                <span>총액: </span>
                {(
                  ((product.price * (100 - product.discountRate)) / 100) *
                  amount
                ).toLocaleString('ko-KR')}
                <span>원</span>
              </Title>
            </Flex>
            <Flex gap='middle' vertical style={{ marginTop: '16px' }}>
              {token ? (
                <>
                  <Button
                    disabled={!token}
                    type='primary'
                    onClick={handlePurchase}
                  >
                    바로주문
                  </Button>
                  <Button
                    disabled={!token}
                    type='primary'
                    onClick={handleAddToCart}
                  >
                    장바구니 담기
                  </Button>
                </>
              ) : (
                <Link style={{ width: '100%' }} to='/login'>
                  <Button level={4} type='primary'>
                    <span>로그인 후 주문</span>
                  </Button>
                </Link>
              )}
            </Flex>
          </section>
        </Flex>
      </>
    )
  );
};

export default ProductDetail;
