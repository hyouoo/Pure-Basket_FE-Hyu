import React from 'react';
import { Button, Result } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const OrderComplete = () => {
  return (
    <>
      <Result
        icon={<SmileOutlined />}
        title='주문이 처리되었습니다. 주문 내역에서 확인해주세요'
        type='primary'
        subTitle={`Order number: ${Date.now()} 주문일자: ${new Date().toLocaleString()}`}
        extra={[
          <Link to='/purchase_list'>
            <Button type='primary' key='console'>
              주문 내역 조회
            </Button>
          </Link>,
        ]}
      />
    </>
  );
};

export default OrderComplete;
