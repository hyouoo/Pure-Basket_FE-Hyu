import React, { useEffect, useState } from 'react';
import { defaultInstance } from '../../network/axios';
import Recipe from '../../components/Recipe';
import { Divider, List, Typography } from 'antd';

const { Title } = Typography;

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async (page = 1) => {
    const {
      data: { content },
    } = await defaultInstance.get(`/recipes`);

    setRecipes(content);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Divider orientation='center'>
        <Title level={3}>Pure Basket 추천 레시피</Title>
      </Divider>
      {isLoading || (
        <List
          style={{ width: '90%' }}
          itemLayout='vertical'
          size='large'
          pagination={{
            onChange: (page) => {},
            pageSize: 5,
          }}
          dataSource={recipes}
          renderItem={(item) => (
            <>
              <Recipe item={item} />
              <Divider />
            </>
          )}
        />
      )}
    </>
  );
};

export default Recipes;
