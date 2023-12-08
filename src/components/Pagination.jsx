import React, { useState } from 'react';
import { Pagination } from 'antd';
const PaginationComponent = () => {
  const [current, setCurrent] = useState(3);
  const onChange = (page) => {
    setCurrent(page);
  };
  return <Pagination current={current} onChange={onChange} total={50} />;
};
export default PaginationComponent;