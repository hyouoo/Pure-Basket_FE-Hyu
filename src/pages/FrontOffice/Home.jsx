import React, { useEffect, useState } from 'react';
import { defaultInstance } from '../../network/axios';
import {
  Pagination,
  Row,
  Col,
  Carousel,
  theme,
  Divider,
  Typography,
} from 'antd';
import Product from '../../components/Product';

const { Title } = Typography;

const Home = () => {
  const [eventProducts, setEventProducts] = useState({});
  const [products, setProducts] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [current, setCurrent] = useState(1);
  const [eventCurrent, setEventCurrent] = useState(1);
  
  const onChange = (page) => {
    setCurrent(page);
    fetchData(eventCurrent, page);
  };

  const onChangeEvent = (page) => {
    setEventCurrent(page);
    fetchData(page, current);
  };

  const fetchData = async (eventPage, page) => {
    const {
      data: { eventProducts, products },
    } = await defaultInstance.get(`/api/products?eventPage=${eventPage}&page=${page}`);
    setEventProducts(eventProducts);
    setProducts(products);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData(eventCurrent, current);
  }, []);

  return (
    <>
      <Divider orientation="center">
        <Title level={3}> 할인 중인 상품</Title>
      </Divider>
      <Row gutter={[24, 36]}>
        {isLoading
          ? null
          : eventProducts.content.slice(0, 8).map((p) => {
              return (
                <Col key={p.category + p.name} className="gutter-row" span={6}>
                  <Product product={p}></Product>
                </Col>
              );
            })}
      </Row>
      <Pagination
        defaultCurrent={1}
        onChange={onChangeEvent}
        showSizeChanger={false}
        total={eventProducts.totalElements}
      />

      <Divider orientation="center">
        <Title level={3}>일반 상품</Title>
      </Divider>
      <Row gutter={[24, 36]}>
        {isLoading
          ? null
          : products.content.map((p) => {
              return (
                <Col key={p.category + p.name} className="gutter-row" span={6}>
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
