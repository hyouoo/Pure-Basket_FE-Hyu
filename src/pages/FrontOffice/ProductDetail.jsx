import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createJwtInstance, defaultInstance } from '../../network/axios';
import { useRecoilValue } from 'recoil';
import { userState } from '../../recoil/atoms';
import { Typography, Flex, Image, Divider, Button, InputNumber } from 'antd';

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
        <Flex gap='middle'>
          <section>
            <Flex gap='middle' vertical>
              {product.images.map((image, i) => {
                return (
                  <Image
                    key={image + i}
                    preview={false}
                    width={300}
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

            <Title level={3}>
              {product.price.toLocaleString('ko-KR')} <span>원</span>
            </Title>

            <Title level={4}>
              {/* <span>남은 수량:</span> {product.stock.toLocaleString('ko-KR')} */}
              <span>개</span>
            </Title>
            <Paragraph>{product.info}</Paragraph>

            <Flex justify='space-between'>
              <InputNumber
                min={1}
                max={product.stock}
                defaultValue={amount}
                onChange={onChange}
              />

              <Title level={4}>
                <span>총액: </span>
                {(product.price * amount).toLocaleString('ko-KR')}
                <span>원</span>
              </Title>
            </Flex>
            <Flex gap='middle' vertical>
              <Button type='primary' onClick={handlePurchase}>
                바로주문
              </Button>
              <Button type='primary' onClick={handleAddToCart}>
                장바구니 담기
              </Button>
            </Flex>
          </section>
        </Flex>
      </>
    )
  );
};

export default ProductDetail;
