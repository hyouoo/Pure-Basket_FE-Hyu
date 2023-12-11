import React, { useEffect, useState } from 'react';
import { Typography, Flex, Image, Divider, Button } from 'antd';
import { useParams } from 'react-router-dom';
import { defaultInstance } from '../network/axios';

const { Title, Paragraph } = Typography;

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async (page = 1) => {
    const { data } = await defaultInstance.get(`/products/${productId}`);
    setProduct(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    isLoading || (
      <>
        <Flex gap="middle">
          <section>
            <Flex gap="middle" vertical>
              {product.images.map((image, i) => {
                return (
                  <Image
                    key={image + i}
                    preview={false}
                    width={200}
                    src={`${image}`}
                  />
                );
              })}
            </Flex>
          </section>
          <section>
            <Title level={3}>{product.name}</Title>
            <Divider />

            <Title level={3}>
              {product.price} <span>원</span>
            </Title>

            <Title level={4}>
              <span>남은 수량:</span> {product.price}
              <span>개</span>
            </Title>
            <Paragraph>{product.info}</Paragraph>
            <Flex gap="middle" vertical>
              <Button type="primary">바로주문</Button>
              <Button type="primary">장바구니 담기</Button>
            </Flex>
          </section>
        </Flex>
      </>
    )
  );
};

export default ProductDetail;
