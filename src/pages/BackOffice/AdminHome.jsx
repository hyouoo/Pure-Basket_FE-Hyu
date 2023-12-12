import React, { useEffect, useState } from 'react';
import { Avatar, Divider, Flex, List, Radio, Space, Typography } from 'antd';
import { createJwtInstance } from '../../network/axios';
import { userState } from '../../recoil/atoms';
import { useRecoilValue } from 'recoil';

const { Title } = Typography;

const AdminHome = () => {
  const [eventProducts, setEventProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useRecoilValue(userState);

  const fetchData = async () => {
    const {
      data: { products, eventProducts },
    } = await createJwtInstance(token).get(`/backoffice/products`);
    setEventProducts(eventProducts.content);
    setProducts(products.content);
    console.log(eventProducts);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    isLoading || (
      <Flex style={{ width: '100%' }} gap={40}>
        <Flex style={{ width: '45%' }} vertical>
          <Title level={3}> 할인 중인 상품</Title>
          <List
            pagination={{
              position: 'bottom',
              align: 'center',
            }}
            dataSource={eventProducts}
            renderItem={(item, index) => (
              <List.Item
                actions={[
                  <a key="list-loadmore-edit">편집</a>,
                  <a key="list-loadmore-more">삭제</a>,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={`${item.images[0]}`} />}
                  title={item.name}
                  description={item.info}
                />
                <div>
                  <p>원가: {item.price.toLocaleString('ko-KR')}원</p>
                  {/* <p>할인가: {(item.price).toLocaleString('ko-KR')}원</p> */}
                  <p>재고: {item.stock}개</p>
                  <p>할인율: {item.discountRate / 100}%</p>
                </div>
              </List.Item>
            )}
          />
        </Flex>
        <Flex style={{ width: '45%' }} vertical>
          <Title level={3}> 일반 상품</Title>
          <List
            pagination={{
              position: 'bottom',
              align: 'center',
            }}
            dataSource={products}
            renderItem={(item, index) => (
              <List.Item
                actions={[
                  <a key="list-loadmore-edit">편집</a>,
                  <a key="list-loadmore-more">삭제</a>,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={`${item.images[0]}`} />}
                  title={item.name}
                  description={item.info}
                />
                <div>
                  <p>가격: {item.price.toLocaleString('ko-KR')}원</p>
                  <p>재고: {item.stock}개</p>
                </div>
              </List.Item>
            )}
          />
        </Flex>
      </Flex>
    )
  );
};

export default AdminHome;
