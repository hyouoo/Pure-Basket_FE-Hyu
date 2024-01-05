import React, { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { defaultInstance } from '../network/axios';
import { useRecoilState } from 'recoil';
import { userState } from '../recoil/atoms';

import { Layout, Anchor, theme, Button, Flex, Typography } from 'antd';
import Search from 'antd/es/input/Search';
const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

const LayoutComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer, colorPrimary, colorSecondary, colorTertiary },
  } = theme.useToken();
  const [user, setUser] = useRecoilState(userState);
  const [inputValue, setInputValue] = useState('');

  const handleClick = () => {
    setUser(() => ({
      token: '',
      email: '',
      role: '',
    }));
    navigate('/');
  };

  // ToDo: 검색 결과 페이지 만들기
  const onSearch = async () => {
    // const data = await defaultInstance.get(
    //   `/products/search?query=${inputValue}`
    // );

    setInputValue('');
    navigate(`/search?query=${inputValue}`)
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <Layout>
      <Header
        style={{
          backgroundColor: colorSecondary,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: `1px solid ${colorPrimary}`,
        }}
      >
        <Link to="/">
          <Flex justify="center" align="start">
            <img src="pure-basket-logo.png" alt="" width={64} height={48} />
            <Title style={{ color: colorPrimary }} level={2}>
              Pure Basket
            </Title>
          </Flex>
        </Link>
        <Search
          placeholder="input search text"
          onChange={handleChange}
          onSearch={onSearch}
          enterButton
          style={{
            width: '400px',
          }}
          value={inputValue}
        />
        <Flex gap="small" wrap="wrap">
          {user.email ? (
            <>
              <Title level={4}>{user.email}</Title>
              <Button onClick={handleClick}>로그아웃</Button>
            </>
          ) : (
            location.pathname.includes('admin') || (
              <>
                <Link to="login">
                  <Button type="primary">로그인</Button>
                </Link>
                <Link to="signup">
                  <Button>회원가입</Button>
                </Link>
              </>
            )
          )}
        </Flex>
      </Header>
      <Layout>
        <Sider
          style={{
            margin: '8px',
            backgroundColor: colorTertiary,
            borderRight: '1px solid rgba(0, 0, 0, 0.08)',
          }}
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            // console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            // console.log(collapsed, type);
          }}
        >
          <div />
          {location.pathname.includes('admin') ? (
            <Anchor
              style={{
                marginTop: '8px',
                backgroundColor: colorTertiary,
              }}
              items={[
                {
                  key: 'part-1',
                  href: '/admin',
                  title: `상품`,
                },
                {
                  key: 'part-2',
                  href: '/admin/recipes',
                  title: '레시피',
                },
              ]}
            />
          ) : (
            <Anchor
              style={{
                marginTop: '8px',
                backgroundColor: colorTertiary,
              }}
              items={
                !user.token
                  ? [
                      {
                        key: 'part-1',
                        href: '/',
                        title: `상품 조회`,
                      },
                      {
                        key: 'part-2',
                        href: '/recipes',
                        title: '추천 레시피',
                      },
                    ]
                  : [
                      {
                        key: 'part-1',
                        href: '/',
                        title: `상품 조회`,
                      },
                      {
                        key: 'part-2',
                        href: '/recipes',
                        title: '추천 레시피',
                      },
                      {
                        key: 'part-3',
                        href: '/carts',
                        title: '장바구니',
                      },
                      {
                        key: 'part-4',
                        href: '/purchase_list',
                        title: '주문내역',
                      },
                    ]
              }
            />
          )}
        </Sider>
        <Layout>
          <Content
            style={{
              margin: '24px 16px 0',
            }}
          >
            <Flex
              vertical
              justify="start"
              align="center"
              style={{
                padding: 24,
                width: '100%',
                minHeight: '85vh',
                background: colorBgContainer,
              }}
            >
              <Outlet />
            </Flex>
          </Content>
        </Layout>
      </Layout>
      <Footer
        style={{
          height: '40px',
          textAlign: 'center',
        }}
      >
        Pure Basket ©2023
      </Footer>
    </Layout>
  );
};

export default LayoutComponent;
