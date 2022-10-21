import { ComponentType } from "react";
import { IconType } from "react-icons";

/*
Undefined group means store
*/

/*
Group
*/

type IRouteGroupCategories = "main" | "menuBar1" | "menuBar2";
export interface IRoute {
  component: ComponentType;
  name: string;
  activePath?: string;
  path: string;
  group?: IRouteGroupCategories;
  logo?: IconType;
}
