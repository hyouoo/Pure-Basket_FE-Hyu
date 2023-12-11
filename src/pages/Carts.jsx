import React, { useState } from 'react';
import { Button, Table } from 'antd';

const columns = [
  {
    title: '상품명',
    dataIndex: 'name',
  },
  {
    title: '수량',
    dataIndex: 'quantity',
  },
  {
    title: '가격',
    dataIndex: 'price',
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
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
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
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
        </span>
      </div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    </div>
  );
};

export default Carts;
