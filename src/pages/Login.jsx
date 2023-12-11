import React from 'react';
import { Form, Input, Button } from 'antd';
const MyFormItemContext = React.createContext([]);
function toArr(str) {
  return Array.isArray(str) ? str : [str];
}
const MyFormItem = ({ name, ...props }) => {
  const prefixPath = React.useContext(MyFormItemContext);
  const concatName =
    name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;
  return <Form.Item name={concatName} {...props} />;
};

const Login = () => {
  const onFinish = (value) => {
    console.log(value);
  };
  return (
    <Form name="form_item_path" layout="vertical" onFinish={onFinish}>
      <MyFormItem name="email" label="Email">
        <Input type="email" />
      </MyFormItem>
      <MyFormItem name="password" label="Password">
        <Input type="password" />
      </MyFormItem>

      <Button type="primary" htmlType="submit">
        로그인
      </Button>
    </Form>
  );
};

export default Login;
