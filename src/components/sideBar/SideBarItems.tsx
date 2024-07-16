import React, { useEffect, useState } from "react";
import { Menu } from 'antd';
import {
    SolutionOutlined
} from '@ant-design/icons';

import { SubMenus, UserRole } from "./interface/sideBar.ts";
import { errorModal } from "../dialogs/warn/WarnDialog.tsx";
import { Link } from "react-router-dom";

const { Item, SubMenu } = Menu;

const sideObj: Array<SubMenus> = [
    {
        icon: <SolutionOutlined />,
        routes: [
            { route: "/conferencia/checklist", name: "Check List", permission: [null] },
            { route: "/conferencia/itens", name: "Itens", permission: ['master'] }
        ],
        title: 'Conferência',
        style: { backgroundColor: '#004AAD' }
    },
];

function SideBarItems() {

    const [role, setRole] = useState<Array<UserRole>>([]);

    const hasPermission = (list: Array<string | null>): boolean => {
        const allowedRoles = role.map(r => r.role);
        return list.some(key => (key === null || allowedRoles.includes(key)));
    };


    return sideObj.map((obj, iMenu) => (
        <SubMenu
            key={iMenu}
            icon={obj.icon}
            title={obj.title}
            style={obj.style}
        >
            {obj.routes
                .map((route, iRoute) =>
                    hasPermission(route.permission) && (
                        <Item key={`${iMenu}${iRoute}`}>
                            <Link to={route.route}>{route.name}</Link>
                        </Item>
                    )
                )}
        </SubMenu>
    ));


}

export default SideBarItems;
