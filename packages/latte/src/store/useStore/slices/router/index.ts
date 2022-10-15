import { DEFAULT_ROUTE } from "../../../../helper/global";
import { IRouterSlice } from "./types";

export const routerSlice: StoreSlice<IRouterSlice> = (set) => ({
  router: {
    activeRoute: DEFAULT_ROUTE.route ? DEFAULT_ROUTE.route : "",
    setActiveRoute: (route) =>
      set(
        ({ router }: IRouterSlice): IRouterSlice => ({
          router: {
            ...router,
            activeRoute: route,
          },
        })
      ),
    breadcrumbs: [DEFAULT_ROUTE],
    setBreadcrumbs: (crumbs) =>
      set(
        ({ router }: IRouterSlice): IRouterSlice => ({
          router: { ...router, breadcrumbs: [...crumbs] },
        })
      ),
  },
});
