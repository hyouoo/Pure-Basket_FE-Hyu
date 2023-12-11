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

const Signup = () => {
  const onFinish = (e) => {
    console.log(e);
  };
  return (
    <Form name="form_item_path" layout="vertical" onFinish={onFinish}>
      <MyFormItem name="email" label="Email">
        <Input type="email" />
      </MyFormItem>
      <MyFormItem name="password" label="Password">
        <Input type="password" />
      </MyFormItem>

      <MyFormItem name="address" label="주소">
        <Input />
      </MyFormItem>
      <MyFormItem name="phone" label="전화번호">
        <Input />
      </MyFormItem>

      <Button type="primary" htmlType="submit">
        회원가입
      </Button>
    </Form>
  );
};

export default Signup;
