import { ReactElement } from "react";

export interface MenuRotas {
  name: string
  route: string
  permission: Array<string | null>;
}
export interface SubMenus {
  icon: ReactElement<any, any>;
  title: string;
  style: any;
  routes: Array<MenuRotas>;
}

export interface UserRole {
  idCondutor: number;
  role: string;
  nome: string;
}
