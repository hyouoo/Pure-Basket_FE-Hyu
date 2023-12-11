import React from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    // <Result
    //   status="404"
    //   title="404"
    //   subTitle="해당 페이지가 존재하지 않습니다.."
    //   extra={
    //     <Button type="primary" danger>
    //       Back Home
    //     </Button>
    //   }
    // />
    <Result
      status="error"
      title="해당 페이지가 존재하지 않습니다."
      subTitle="404"
      extra={[
        <Link to="">
          <Button Button type="primary" danger>
            홈페이지
          </Button>
        </Link>,
      ]}
    ></Result>
  );
};

export default NotFound;
