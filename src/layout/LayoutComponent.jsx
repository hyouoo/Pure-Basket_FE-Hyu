import { Outlet } from 'react-router-dom';
import React from 'react';
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme, Button, Flex, Divider } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

const LayoutComponent = () => {
  const {
    token: { colorBgContainer, colorPrimary, colorTertiary },
  } = theme.useToken();
  return (
    <Layout>
      <Header
        style={{
          backgroundColor: colorPrimary,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        Pure Basket
        <Flex gap="small" wrap="wrap">
          <Button type="primary">로그인</Button>
          <Button>회원가입</Button>
        </Flex>
      </Header>
      <Layout>
        <Sider
          // type="primary"
          style={{
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
          <div className="demo-logo-vertical" />
          <Menu
            style={{
              backgroundColor: colorTertiary,
            }}
            // theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            // items={[
            //   UserOutlined,
            //   VideoCameraOutlined,
            //   UploadOutlined,
            //   UserOutlined,
            // ].map((icon, index) => ({
            //   key: String(index + 1),
            //   icon: React.createElement(icon),
            //   label: `nav ${index + 1}`,
            // }))}

            items={['상품 조회', '장바구니?', '추천 레시피'].map(
              (menu, index) => ({
                key: String(index + 1),
                icon: React.createElement(SmileOutlined),
                label: `${menu}`,
              })
            )}
          />
          <Divider />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            할인 중인 상품
          </Header>
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
