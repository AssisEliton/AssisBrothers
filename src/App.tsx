import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedLayout from './components/layout/layout';
import { ThemeProvider } from 'styled-components';

import './App.css';
import { ConfigProvider } from 'antd';
const darkTheme = {
  token: {
    colorPrimary: '#1890ff',
    menuDarkBg: '#004AAD',
    menuDarkSubmenuBg: '#004AAD',
    menudarkSubMenuItemBg: '#FFFFFF',
    menuDarkColor: 'rgba(255, 255, 255, 0.85)',
    menuDarkHighlightColor: '#ffffff',
    menuDarkItemActiveBg: '#4c4c4c',
    menuDarkSelectedItemIconColor: '#ffffff',
    menuDarkSelectedItemTextColor: '#ffffff',
  },
};
function App() {
  return (
    <ConfigProvider theme={darkTheme}>
      <ThemeProvider theme={darkTheme}>

        <Routes>
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/*" element={<ProtectedLayout />} />
        </Routes>
      </ThemeProvider>
    </ConfigProvider>
  );
}

export default App;
