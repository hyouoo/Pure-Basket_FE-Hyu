import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button} from 'antd';
import {useRecoilValue} from 'recoil';
import {userState} from '../../recoil/atoms';
import {createJwtInstance} from '../../network/axios';
import CartItem from "../../components/CartList/CartItem";
import styled from "styled-components";

const Summary = styled.div`
  position: relative;
  width: 250px;
  height: 300px;
  margin-left: 50px;
  padding: 10px;
  border: 2px solid gainsboro;
  border-radius: 20px;
  background-color: whitesmoke;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;
const Fee = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const PurchaseButton = styled.div`
  font-family: 'Dokdo';
  font-size: 20px;
  width: 200px;
  height: 50px;
  border: 1px solid #77bb70;
  border-radius: 10px;
  background-color: #d4ffb3;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const Carts = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [carts, setCarts] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const start = () => {
        setLoading(true);
        // ajax request after empty completing
        setTimeout(() => {
            setSelectedRowKeys([]);
            setLoading(false);
        }, 1000);
    };
    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    const navigate = useNavigate();
    const {token} = useRecoilValue(userState);
    const jwtInstance = createJwtInstance(token);

    const getCarts = async () => {
        const {data} = await jwtInstance.get(`/api/carts`)
        setCarts(data);
        setIsLoading(false);
    }
    const handlePurchase = async () => {
      await jwtInstance.post(`/api/purchases`, {
        // purchaseList: [{ productId, amount }]
      })
      navigate('/purchase_list');
    }

    const shipping = 3000;
    const totalPrice = carts?.reduce(
      (accumulator, cart) => accumulator + (cart.price * cart.amount), 0);

    useEffect(() => {
        getCarts();
    }, []);

    return (
        <div>
            <div style={{marginBottom: 16,}}>
                <Button
                    type="primary"
                    onClick={start}
                    disabled={!hasSelected}
                    loading={loading}
                >
                    Reload
                </Button>
                <span style={{marginLeft: 8,}}>
                    {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                </span>
            </div>
            <div style={{display: 'flex', justifyContent:'space-around'}}>
                {/*<Table rowSelection={rowSelection} columns={columns} dataSource={data}/>*/}
                <div>
                    {isLoading || (
                        carts?.map(cart => {
                            return <CartItem key={cart.id} instance={jwtInstance} cart={cart}/>
                        })
                    )}
                </div>
                <Summary>
                    <p style={{fontSize: '20px', fontStyle: 'Bold'}}>주문 내역</p>
                    <Fee>
                    <span>상품 금액</span><span>{totalPrice.toLocaleString('ko-KR')}원</span>
                    </Fee>
                    <Fee>
                      <div>배송료</div><div>{shipping.toLocaleString('ko-KR')}원</div>
                    </Fee>
                    <Fee>
                      <div>합계</div><div>{(totalPrice + shipping).toLocaleString('ko-KR')}원</div>
                    </Fee>
                    <PurchaseButton onClick={handlePurchase}>주문하기</PurchaseButton>
                </Summary>
            </div>
        </div>
    );
};

export default Carts;
