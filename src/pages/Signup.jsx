import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { defaultInstance } from '../network/axios';
import { Form, Input, Button, Alert, Flex, Typography } from 'antd';

const { Title } = Typography;

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
    defaultInstance
      .post(`/auth/signup`, { ...data })
      .then(() => navigate('/login'))
      .catch((error) => {
        setText(error.toString());
        setIsAlert(true);
      });
  };

  return (
    <Flex style={{ width: '50%' }} gap={36} vertical>
      <Title level={2}>회원가입</Title>

      <Form
        style={{ width: '100%' }}
        name='form_item_path'
        layout='vertical'
        align='end'
        onFinish={handleSubmit}
      >
        <MyFormItem name='name' label='이름'>
          <Input type='text' />
        </MyFormItem>
        <MyFormItem name='email' label='Email'>
          <Input type='email' />
        </MyFormItem>
        <MyFormItem name='password' label='Password'>
          <Input type='password' />
        </MyFormItem>

        <MyFormItem name='address' label='주소'>
          <Input />
        </MyFormItem>
        <MyFormItem name='phone' label='전화번호'>
          <Input />
        </MyFormItem>

        {isAlert && (
          <Alert message='Error' description={text} type='error' showIcon />
        )}

        <Button type='primary' htmlType='submit'>
          회원가입
        </Button>
      </Form>
    </Flex>
  );
};

export default Signup;
