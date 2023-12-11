import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyle from './styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { RecoilRoot } from 'recoil';
import { ConfigProvider } from 'antd';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <RecoilRoot>
    <ThemeProvider theme={theme}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#77bb70',
            colorSecondary: '#b3d3b0',
            colorTertiary: '#e5f0dd22',
            colorInfo: '#77bb70',
            colorSuccess: '#f0b13b',
            borderRadius: 8,
            colorSplit: 'rgba(0, 0, 0, 0.38)',
          },
        }}
      >
        <GlobalStyle />
        <App />
      </ConfigProvider>
    </ThemeProvider>
  </RecoilRoot>
  // </React.StrictMode>
);
