import React, { useEffect, useState } from 'react';
import { defaultInstance } from '../../network/axios';
import { useSearchParams } from 'react-router-dom';
import {
  Pagination,
  Row,
  Col,
  Carousel,
  Flex,
  Divider,
  Typography,
} from 'antd';
import Product from '../../components/Product';

const { Title } = Typography;

const Home = () => {
  const [eventProducts, setEventProducts] = useState({});
  const [products, setProducts] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [current, setCurrent] = useState(26);
  const [searchParams, setSearchParams] = useSearchParams();
  const onChange = (page) => {
    setCurrent(page);
    fetchData(page);
  };

  // const {
  //   token: { colorBgContainer, colorPrimary, colorTertiary },
  // } = theme.useToken();

  const query = searchParams.get('query');

  const fetchData = async (page = 1) => {
    const api = query
      ? `/products/search?query=${query}&page=${page}`
      : `/products?page=${page}`;

    const {
      data: { eventProducts, products },
    } = await defaultInstance.get(api);
    setEventProducts(eventProducts);
    setProducts(products);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [searchParams]);

  return (
    <>
      {query ? (
        <div style={{ width: '100%' }}>
          <Title level={2}> 검색어: {query}</Title>
        </div>
      ) : null}
      <Divider orientation='center'>
        <Title level={3}> 할인 중인 상품</Title>
      </Divider>

      {/* <Carousel autoplay> */}
      {/* <Flex gap="middle" vertical={false} justify="center"> */}
      <Row gutter={[24, 36]}>
        {isLoading
          ? null
          : eventProducts.content.slice(0, 8).map((p) => {
              return (
                <Col key={p.category + p.name} className='gutter-row' span={60}>
                  <Product product={p}></Product>
                </Col>
              );
            })}
        {/* </Flex> */}
      </Row>
      {/* </Carousel> */}

      <Divider orientation='center'>
        <Title level={3}>일반 상품</Title>
      </Divider>

      <Row gutter={[24, 36]}>
        {isLoading
          ? null
          : products.content.map((p) => {
              return (
                <Col key={p.category + p.name} className='gutter-row' span={6}>
                  <Product product={p}></Product>
                </Col>
              );
            })}
      </Row>

      <Pagination
        defaultCurrent={1}
        onChange={onChange}
        showSizeChanger={false}
        total={products.totalElements}
      />
    </>
  );
};

export default Home;
