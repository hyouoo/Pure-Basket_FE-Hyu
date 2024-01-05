import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { createJwtInstance, defaultInstance } from '../../network/axios';
import { useRecoilValue } from 'recoil';
import { userState } from '../../recoil/atoms';
import { Typography, Flex, Image, Divider, Button, List } from 'antd';

const { Title, Paragraph } = Typography;

const RecipeDetail = () => {
  const navigate = useNavigate();
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useRecoilValue(userState);

  const fetchData = async (page = 1) => {
    const { data } = await defaultInstance.get(`/recipes/${recipeId}`);
    // console.log(data);
    setRecipe(data);
    setIsLoading(false);
  };

  const handleClick = async () => {
    await createJwtInstance(token).post(`/carts/recipes/${recipeId}`);
    navigate('/carts');
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    isLoading || (
      <>
        <Flex gap='middle'>
          <section>
            <Flex gap='middle' vertical>
              <Image
                preview={false}
                width={200}
                src={`${recipe.imgUrl}`}
                style={{ borderRadius: '8px' }}
              />
              <Button onClick={handleClick} type='primary'>
                관련 상품 장바구니 담기
              </Button>
            </Flex>
          </section>
          <section>
            <Title level={3}>{recipe.name}</Title>
            <Divider />

            <Paragraph>{recipe.info}</Paragraph>
          </section>
        </Flex>
        <Divider></Divider>
        <Title level={4}>관련 상품</Title>
        <List
          style={{
            width: '80%',
            borderRadius: '8px',
          }}
          itemLayout='vertical'
          size='large'
          dataSource={recipe.products}
          renderItem={(item) => (
            <Link to={`/products/${item.id}`}>
              <List.Item
                style={{
                  border: '1px solid #00000033',
                  borderRadius: '8px',
                  margin: '8px',
                }}
                key={item.name}
                extra={
                  <img
                    width={160}
                    alt={item.name}
                    src={item.imgUrl}
                    style={{ borderRadius: '8px' }}
                  />
                }
              >
                <List.Item.Meta title={item.name} />
                {item.info}
              </List.Item>
            </Link>
          )}
        />
      </>
    )
  );
};

export default RecipeDetail;
