import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { List } from 'antd';
import { Link } from 'react-router-dom';
import { defaultInstance } from '../network/axios';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async (page = 1) => {
    const {
      data: { content },
    } = await defaultInstance.get(`/recipes`);

    setRecipes(content);
    console.log(recipes);
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
            <Link to={`/recipes/${item.id}`}>
              <List.Item
                key={item.name}
                extra={<img width={272} alt={item.name} src={item.imgUrl} />}
              >
                <List.Item.Meta title={item.name} />
                {item.info}
              </List.Item>
            </Link>
          )}
        />
      )}
    </>
  );
};

export default Recipes;
