import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Alert } from 'antd';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 8px 16px;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

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
  const navigate = useNavigate();
  const [isAlert, setIsAlert] = useState(false);
  const [text, setText] = useState('');

  const handleSubmit = async (data) => {
    axios
      .post(`http://localhost:8080/api/auth/login`, { ...data })
      .then(() => navigate('/'))
      .catch((error) => {
        // setText(error.toString());
        setText('이메일 또는 비밀번호가 일치하지 않습니다');
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
      <MyFormItem name="email" label="Email">
        <Input type="email" />
      </MyFormItem>
      <MyFormItem name="password" label="Password">
        <Input type="password" />
      </MyFormItem>

      {isAlert ? (
        <Alert message="Error" description={text} type="error" showIcon />
      ) : null}
      <Button type="primary" htmlType="submit">
        로그인
      </Button>
    </Form>
  );
};

export default Login;
