import React, { useEffect, useState } from 'react';
import { defaultInstance } from '../../network/axios';
import { Divider, List } from 'antd';
import Recipe from '../../components/Recipe';

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
      {isLoading || (
        <List
          style={{ width: '90%' }}
          itemLayout="vertical"
          size="large"
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
