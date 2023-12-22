import React, { useEffect, useState } from 'react';
import { Avatar, Divider, Flex, List, Radio, Space, Typography } from 'antd';
import { createJwtInstance } from '../../network/axios';
import { userState } from '../../recoil/atoms';
import { useRecoilValue } from 'recoil';

const { Title } = Typography;

const AdminRecipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useRecoilValue(userState);

  const fetchData = async () => {
    const {
      data: { content },
    } = await createJwtInstance(token).get(`/api/backoffice/recipes`);
    setRecipes(content);
    console.log(content);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    isLoading || (
      <Flex style={{ width: '100%' }} vertical>
        <Title level={3}>레시피</Title>
        <List
          pagination={{
            position: 'bottom',
            align: 'center',
          }}
          dataSource={recipes}
          renderItem={(item, index) => (
            <List.Item
              actions={[
                <a key="list-loadmore-edit">편집</a>,
                <a key="list-loadmore-more">삭제</a>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={`${item.imgUrl}`} />}
                title={item.name}
                description={item.info}
              />
              <div>
                {/* <p>원가: {item.price.toLocaleString('ko-KR')}원</p>
                <p>할인가: {(item.price).toLocaleString('ko-KR')}원</p>
                <p>재고: {item.stock}개</p>
                <p>할인율: {item.discountRate / 100}%</p> */}
              </div>
            </List.Item>
          )}
        />
      </Flex>
    )
  );
};

export default AdminRecipe;
