import React, { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { defaultInstance } from '../network/axios';
import { useSetRecoilState } from 'recoil';
import { userState } from '../recoil/atoms';
import base64 from 'base-64';
import { Form, Input, Button, Alert, Typography, Flex } from 'antd';
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

const Login = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isBackOffice = useRef(pathname.includes('admin'));

  const [isAlert, setIsAlert] = useState(false);
  const [text, setText] = useState('');
  const setUserState = useSetRecoilState(userState);

  const handleSubmit = async (data) => {
    defaultInstance
      .post(`/${isBackOffice.current ? 'auth/admin' : 'auth'}/login`, {
        ...data,
      })
      .then((res) => {
        const token = res.headers.authorization;
        const payload = token.substring(
          token.indexOf('.') + 1,
          token.lastIndexOf('.')
        );
        const decoded = JSON.parse(base64.decode(payload));
        const state = {
          token,
          email: decoded.sub,
          role: decoded.auth,
        };
        setUserState(() => ({ ...state }));
        navigate(`${isBackOffice.current ? '/admin' : '/'}`);
      })
      .catch((error) => {
        // setText(error.toString());
        setText('이메일 또는 비밀번호가 일치하지 않습니다');
        setIsAlert(true);
      });
  };

  return (
    <Flex style={{ width: '50%' }} gap={36} vertical>
      <Title level={2}>{isBackOffice.current ? '관리자' : '유저'} 로그인</Title>

      <Form
        name='form_item_path'
        layout='vertical'
        align='end'
        onFinish={handleSubmit}
      >
        <MyFormItem name='email' label='Email'>
          <Input type='email' />
        </MyFormItem>
        <MyFormItem name='password' label='Password'>
          <Input type='password' />
        </MyFormItem>

        {isAlert ? (
          <Alert message='Error' description={text} type='error' showIcon />
        ) : null}
        <Button type='primary' htmlType='submit'>
          로그인
        </Button>
      </Form>
    </Flex>
  );
};

export default Login;
