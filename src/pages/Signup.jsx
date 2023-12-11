import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Alert } from 'antd';

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
  const navigate = useNavigate();
  const [isAlert, setIsAlert] = useState(false);
  const [text, setText] = useState('');

  const handleSubmit = async (data) => {
    axios
      .post(`http://localhost:8080/api/auth/signup`, { ...data })
      .then(() => navigate('/login'))
      .catch((error) => {
        setText(error.toString());
        setIsAlert(true);
      });
  };

  return (
    <Form
      style={{ width: '50%' }}
      name="form_item_path"
      layout="vertical"
      align="end"
      onFinish={handleSubmit}
    >
      <MyFormItem name="name" label="이름">
        <Input type="text" />
      </MyFormItem>
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

      {isAlert && (
        <Alert message="Error" description={text} type="error" showIcon />
      )}

      <Button type="primary" htmlType="submit">
        회원가입
      </Button>
    </Form>
  );
};

export default Signup;
