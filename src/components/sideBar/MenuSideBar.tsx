import React from 'react';
import styled from 'styled-components';
import { Layout, Menu } from 'antd';
import logo from "../../logo.svg"
import SideBarItems from './SideBarItems.tsx';

const { Sider } = Layout;
const { Item } = Menu;

interface MenuSideBarProps {
    collapsed: boolean;
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}


export default function MenuSideBar({ collapsed, setCollapsed }: MenuSideBarProps) {

    const StyledMenu = styled(Menu)`
        &.ant-menu-dark,
        &.ant-menu-dark > .ant-menu {
            color: rgba(255, 255, 255, 0.85);
            background: #1f1f1f;
        }
    `;

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

    return (
        <Sider
            breakpoint="lg"
            collapsedWidth="0"
            style={{ background: darkTheme.token.menuDarkBg }}
            onBreakpoint={(broken) => console.log(broken)}
            onCollapse={(collapsed, type) => console.log(collapsed, type)}
        >
            <div style={{ padding: '24px', textAlign: 'center' }}>
                <img
                    src={logo}
                    alt="Logo"
                    style={{
                        width: collapsed ? '48px' : '80%',
                        height: 'auto',
                        borderRadius: '50%',
                        transition: 'width 0.3s ease-in-out'
                    }}
                />
            </div>

            <StyledMenu
                theme='dark'
                mode="inline"
                style={{ backgroundColor: '#004AAD', fontWeight: 'bold', color: '#FFFFFF' }}
                defaultSelectedKeys={['1']}
                onClick={() => setCollapsed(window.innerWidth < 768)}
            >
                <SideBarItems />
            </StyledMenu>

            <div className="demo-logo-vertical" />
        </Sider>
    );
}

