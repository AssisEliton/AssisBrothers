import React, { useState } from 'react';
import { Layout } from 'antd';
import { Rotas } from '../../router/routes.tsx';
import MenuSideBar from '../sideBar/MenuSideBar.tsx';


const { Header, Content, Footer } = Layout; 

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

const ProtectedLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
   // const { user } = useAuth();

    // if (!user)
    //     return <Navigate to="/login" />;


    return (
        <Layout style={{ minHeight: '100vh', background: darkTheme.token.menuDarkBg }}>
            <MenuSideBar collapsed={collapsed} setCollapsed={setCollapsed}/>

            <Layout>

                <Header className='d-flex justify-content-end align-items-center' style={{ background: darkTheme.token.menuDarkBg }}>
                     {/* <LogoffDropdown /> */}
                </Header>

                <Content style={{ margin: '24px 16px 0', background: darkTheme.token.menudarkSubMenuItemBg }}>
                    <div style={{ padding: 24, minHeight: 360, background: darkTheme.token.menudarkSubMenuItemBg }}>
                        <Rotas />
                    </div>
                </Content>

                <Footer style={{ textAlign: 'center', background: darkTheme.token.menuDarkBg, color: darkTheme.token.menuDarkColor }}>
                    {new Date().getFullYear()} Created by Eliton assis
                </Footer>

            </Layout>

        </Layout>
    );
};

export default ProtectedLayout;