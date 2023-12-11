import { Link, Outlet } from 'react-router-dom';
import React from 'react';
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import { Layout, Anchor, theme, Button, Flex, Divider } from 'antd';
import Search from 'antd/es/input/Search';
const { Header, Content, Footer, Sider } = Layout;

const LayoutComponent = () => {
  const {
    token: { colorBgContainer, colorPrimary, colorTertiary },
  } = theme.useToken();

  const onSearch = (value, _e, info) => {
    console.log(info?.source, value);
  };
  return (
    <Layout>
      <Header
        style={{
          backgroundColor: colorPrimary,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Link to="/">
          <img src="" alt="" />
          Pure Basket
        </Link>
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          enterButton
          style={{
            width: '400px',
          }}
        />
        <Flex gap="small" wrap="wrap">
          <Link to="login">
            <Button type="primary">로그인</Button>
          </Link>
          <Link to="signup">
            <Button>회원가입</Button>
          </Link>
        </Flex>
      </Header>
      <Layout>
        <Sider
          style={{
            margin: '8px',
            backgroundColor: colorTertiary,
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
          <Anchor
            style={{
              marginTop: '8px',
              backgroundColor: colorTertiary,
            }}
            items={[
              {
                key: 'part-1',
                href: '/',
                title: `상품 조회`,
              },
              {
                key: 'part-2',
                href: '/carts',
                title: '장바구니',
              },
              {
                key: 'part-3',
                href: '/recipes',
                title: '추천 레시피',
              },
              // {
              //   key: 'part-1',
              //   href: '#part-1',
              //   title: `상품 조회`,
              // },
            ]}
          />
          <Divider />
        </Sider>
        <Layout>
          <Content
            style={{
              margin: '24px 16px 0',
            }}
          >
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
              }}
            >
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Pure Basket ©2023
      </Footer>
    </Layout>
  );
};

export default LayoutComponent;
