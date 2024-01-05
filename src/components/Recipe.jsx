import { List } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const Recipe = ({ item }) => {
  return (
    <Link to={`/recipes/${item.id}`}>
      <List.Item
        key={item.name}
        extra={
          <img
            style={{ borderRadius: '8px' }}
            width={272}
            alt={item.name}
            src={item.imgUrl}
          />
        }
      >
        <List.Item.Meta title={item.name} />
        {item.info}
      </List.Item>
    </Link>
  );
};

export default Recipe;
