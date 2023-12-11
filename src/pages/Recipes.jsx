import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { defaultInstance } from '../network/axios';
import { Divider, List } from 'antd';

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
              <Link to={`/recipes/${item.id}`}>
                <List.Item
                  key={item.name}
                  extra={<img width={272} alt={item.name} src={item.imgUrl} />}
                >
                  <List.Item.Meta title={item.name} />
                  {item.info}
                </List.Item>
              </Link>
              <Divider />
            </>
          )}
        />
      )}
    </>
  );
};

export default Recipes;
