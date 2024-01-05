import React, { useState } from 'react';
import * as ST from './style';
import { AiOutlineDelete } from 'react-icons/ai';
import { InputNumber } from 'antd';
import { Link } from 'react-router-dom';
import { userState } from '../../recoil/atoms';
import { useRecoilValue } from 'recoil';
import { createJwtInstance } from '../../network/axios';
import { Typography, theme, Flex } from 'antd';

const { Title, Paragraph } = Typography;

const CartItem = ({ cart, changeAmounts, onDelete }) => {
  const [amount, setAmount] = useState(cart.amount);
  const { token } = useRecoilValue(userState);

  const jwtInstance = createJwtInstance(token);
  const currentPrice = (cart.price * (100 - cart.discountRate)) / 100;
  const totalPrice = currentPrice * amount;

  const {
    token: { colorAccent },
  } = theme.useToken();

  const onChange = (newAmount) => {
    setAmount(newAmount);
    changeAmounts(cart, newAmount);
    setTimeout(() => {
      jwtInstance.put(`carts/${cart.id}`, { amount });
    }, 1500);
  };

  const handleDelete = async () => {
    await jwtInstance.delete(`carts/${cart.id}`);
    onDelete(cart.id);
  };

  return (
    <ST.CartItemRoot>
      <ST.CartItem>
        <Link to={`/products/${cart.id}`}>
          <ST.ProductImage src={cart.imageUrl} alt='' />
        </Link>
        <ST.Info>
          <Title level={3}>{cart.name}</Title>
          <Flex align='center'>
            <ST.Price>
              <Title
                level={5}
                style={{
                  textDecoration: `${
                    cart.event === 'DISCOUNT' ? 'line-through' : ''
                  }`,
                }}
              >
                {cart.price.toLocaleString('ko-KR')}원/EA
              </Title>
            </ST.Price>
            {cart.event === 'DISCOUNT' && (
              <ST.Price>
                <Title level={5} style={{ color: colorAccent }}>
                  {currentPrice.toLocaleString('ko-KR')}원/EA
                </Title>
              </ST.Price>
            )}
          </Flex>
          <InputNumber min={1} defaultValue={amount} onChange={onChange} />
        </ST.Info>
        <Title level={4}>{totalPrice.toLocaleString('ko-KR')}원</Title>

        <AiOutlineDelete
          type='button'
          cursor='pointer'
          style={{ margin: '25px' }}
          fontSize='20px'
          onClick={handleDelete}
        />
      </ST.CartItem>
    </ST.CartItemRoot>
  );
};

export default CartItem;
