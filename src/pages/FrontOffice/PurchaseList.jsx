import React, { useEffect, useState } from 'react';
import { createJwtInstance } from '../../network/axios';
import { useRecoilValue } from 'recoil';
import { userState } from '../../recoil/atoms';
import { Button, Flex, List, Skeleton, Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Title } = Typography;

const PurchaseList = () => {
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const { token } = useRecoilValue(userState);

  const fetchData = async () => {
    setPage((prev) => prev + 1);
    const {
      data: { content },
    } = await createJwtInstance(token).get(`/purchases?page=${page}`);

    setInitLoading(false);
    setData((prev) => [...prev, ...content]);
    setLoading(false);
    //     // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
    //     // In real scene, you can using public method of react-virtualized:
    //     // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
    window.dispatchEvent(new Event('resize'));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onLoadMore = () => {
    setLoading(true);
    fetchData();
  };
  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : null;
  return (
    <List
      style={{ width: '80%' }}
      className='demo-loadmore-list'
      loading={initLoading}
      itemLayout='horizontal'
      loadMore={loadMore}
      dataSource={data}
      renderItem={(item) => (
        <List.Item
        // actions={[
        //   <a key="list-loadmore-edit">edit</a>,
        //   <a key="list-loadmore-more">more</a>,
        // ]}
        >
          {/* <Link to={`/products/${item.productId}`}> */}
          <Skeleton title={false} loading={item.loading} active>
            <List.Item.Meta
              style={{ color: 'black' }}
              title={
                <a href={`/purchase/${item.id}`}>
                  {/* <Title level={5}>{item.name}</Title> */}
                  <Title level={5}>{`주문일자: ${new Date(
                    item.purchasedAt
                  ).toLocaleString()}`}</Title>
                </a>
              }
              // description={`주문일자: ${new Date(item.purchasedAt).toLocaleString()}`}
            />
            <Flex gap={32}>
              {/* <div>수량: {item.amount}개</div> */}
              {/* <div>가격: {item.price.toLocaleString()}원</div> */}
              <Title level={5}>
                총 가격: {item.totalPrice.toLocaleString()}원
              </Title>
            </Flex>
          </Skeleton>
          {/* </Link> */}
        </List.Item>
      )}
    />
  );
};

export default PurchaseList;
