import React, { useState } from "react";
import { Button, Table } from "antd";
import CartItem from "../components/CartList/CartItem";
import Summary from "../components/CartList/Summary";
import { useMutation } from "react-query";
import { putCart } from "../api/carts";
import { createJwtInstance } from "../network/axios";
const columns = [
  {
    title: "상품명",
    dataIndex: "name",
  },
  {
    title: "수량",
    dataIndex: "quantity",
  },
  {
    title: "가격",
    dataIndex: "price",
  },
];
const data = [];
for (let i = 0; i < 21; i++) {
  data.push({
    key: i,
    name: `Cart Item ${i}`,
    quantity: 32,
    price: `Price ${i * 1000} `,
  });
}
// "id" : 2,
//       "name": "참외",
//       "price": 15000,
//       "category": "과일",
//       "imageUrl": "url",
//       "amount": 2


const Carts = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  const jwtInstance = createJwtInstance(token);
  
  const putCartMutation = useMutation(putCart, {
    onSuccess: () => {
      alert('상품이 추가되었습니다.')
    }
  })
  return (
    <div>
      <div
        style={{
          marginBottom: 16,
        }}
      >
        <Button
          type="primary"
          onClick={start}
          disabled={!hasSelected}
          loading={loading}
        >
          Reload
        </Button>
        <span
          style={{
            marginLeft: 8,
          }}
        >
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
        </span>
      </div>
      <div style={{ display: "flex" }}>
        <CartItem />
        <Summary />
      </div>
    </div>
  );
};

export default Carts;
