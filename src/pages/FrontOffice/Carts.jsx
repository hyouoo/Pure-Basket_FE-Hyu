import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Checkbox, Flex } from 'antd';
import { useRecoilValue } from 'recoil';
import { userState } from '../../recoil/atoms';
import { createJwtInstance } from '../../network/axios';
import CartItem from '../../components/CartList/CartItem';
import styled from 'styled-components';
import { Typography, Button, List, Divider } from 'antd';

const { Title, Paragraph } = Typography;

const Summary = styled.div`
  position: relative;
  width: 250px;
  height: 300px;
  margin-left: 50px;
  padding: 10px 25px 10px 25px;
  border: 2px solid gainsboro;
  border-radius: 20px;
  background-color: whitesmoke;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Carts = () => {
  const navigate = useNavigate();
  const [carts, setCarts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [checkItems, setCheckItems] = useState([]);
  const { token } = useRecoilValue(userState);
  const jwtInstance = createJwtInstance(token);

  const shipping = 500;
  let totalPrice = carts
    ?.filter((cart) => checkItems.includes(cart.id))
    .reduce(
      (sum, cart) =>
        sum + (cart.price * (100 - cart.discountRate) * cart.amount) / 100,
      0
    );

  const checkboxHandle = (event) => {
    const item = event.target.id;
    const isChecked = event.target.checked;
    setCheckItems((prev) => {
      if (isChecked) {
        return [...prev, item];
      } else {
        return prev.filter((el) => el !== item);
      }
    });
  };

  const changeAmounts = (cart, newAmount) => {
    setCarts((prevCarts) => {
      const updatedCarts = [...prevCarts];
      const cartIndex = updatedCarts.findIndex((item) => item.id === cart.id);

      if (cartIndex !== -1) {
        updatedCarts[cartIndex] = {
          ...updatedCarts[cartIndex],
          amount: newAmount,
        };
      }
      return updatedCarts;
    });
  };

  const getCarts = async () => {
    const { data } = await jwtInstance.get(`/carts`);
    setCarts(data);
    console.log(data);
    setIsLoading(false);
  };

  const onDelete = (cartId) => {
    setCarts((prev) => prev.filter((cart) => cart.id !== cartId));
  };

  const purchaseList = carts
    ?.filter((cart) => checkItems.includes(cart.id))
    .map((cart) => ({ productId: cart.id, amount: cart.amount }));

  const handlePurchase = async () => {
    await jwtInstance.post(`purchases`, { purchaseList: purchaseList });
    navigate('/order-complete');
  };

  useEffect(() => {
    getCarts();
  }, []);

  return (
    <>
      <Divider orientation='center'>
        <Title level={3}>장바구니</Title>
      </Divider>
      <div>
        <Flex justify='space-around'>
          <div>
            {isLoading ||
              carts?.map((cart) => (
                <Flex style={{ marginBottom: '8px' }}>
                  <Checkbox
                    id={cart.id}
                    onChange={checkboxHandle}
                    style={{ marginRight: '15px' }}
                  />
                  <CartItem
                    cart={cart}
                    changeAmounts={changeAmounts}
                    onDelete={onDelete}
                  />
                </Flex>
              ))}
          </div>
          {isLoading || carts.length <= 0 ? (
            <List></List>
          ) : (
            <Summary>
              <div style={{ textAlign: 'center', fontSize: '20px' }}>
                <Title level={4}>최종 결제 금액</Title>
              </div>
              <Flex justify='space-between'>
                <Title level={5}>상품 금액</Title>
                <Paragraph>{totalPrice.toLocaleString('ko-KR')}원</Paragraph>
              </Flex>
              <Flex justify='space-between'>
                <Title level={5}>배송료</Title>
                <Paragraph>{shipping.toLocaleString('ko-KR')}원</Paragraph>
              </Flex>
              <Flex justify='space-between'>
                <Title level={5}>합계</Title>
                <Paragraph>
                  {(totalPrice + shipping).toLocaleString('ko-KR')}원
                </Paragraph>
              </Flex>
              <Button
                type='primary'
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '40px',
                  paddingTop: '12px',
                }}
                disabled={checkItems.length === 0}
                onClick={handlePurchase}
              >
                <Title level={5}>
                  {checkItems.length > 0 && `${checkItems.length}개`} 상품
                  주문하기
                </Title>
              </Button>
            </Summary>
          )}
        </Flex>
      </div>
    </>
  );
};

export default Carts;
