import { IBreadcrumbsItem } from "../store/useStore/slices/router/types";

export const DICEBEAR_URL = `https://avatars.dicebear.com/api/adventurer-neutral/api`;

// ENV
export const IS_PROD = process.env.NODE_ENV === `production`;

export const AUTH_SERVER_URI = process.env.NEXT_PUBLIC_AUTH_URL;
export const DEFAULT_ROUTE: IBreadcrumbsItem = {
  title: "dashboard",
  route: "dashboard",
};
