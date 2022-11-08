import { IRoute } from "../types";

export interface INavItemProps extends Omit<IRoute, "component"> {}
