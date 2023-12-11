import React, { useEffect, useState } from 'react';
import { Typography, Flex, Image, Divider, Button } from 'antd';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const { Title, Paragraph } = Typography;

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async (page = 1) => {
    const { data } = await axios.get(
      `http://localhost:8080/api/products/${productId}`
    );
    console.log(data);
    setProduct(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? null : (
    <>
      <Flex gap="middle">
        <section>
          <Flex gap="middle" vertical>
            {product.images.map((image) => {
              return <Image preview={false} width={200} src={`${image}`} />;
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
  );
};

export default ProductDetail;
