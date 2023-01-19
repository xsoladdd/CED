import useStore from "../store/useStore";
import { IBreadcrumbsItem } from "../store/useStore/slices/router/types";

interface IuseDashboardRouter {
  breadcrumbs: Array<IBreadcrumbsItem>;
  pushRoute: (crumbs: IBreadcrumbsItem, isReplaceRoute?: boolean) => void;
  // replaceRoute: (crumbs: IBreadcrumbsItem) => void;
  activeRoute: string;
}

const useDashboardRouter = (): IuseDashboardRouter => {
  const {
    router: { breadcrumbs, setBreadcrumbs, setActiveRoute, activeRoute },
  } = useStore();

  const pushRoute = (crumbs: IBreadcrumbsItem, isReplaceRoute = false) => {
    const route = crumbs.route;
    // crumbs.length !== 0 ? crumbs[crumbs.length - 1].route : "page404";
    setActiveRoute(typeof route !== "undefined" ? route : "page404");

    if (isReplaceRoute) {
      setBreadcrumbs([crumbs]);
    } else {
      setBreadcrumbs([...breadcrumbs, crumbs]);
    }
  };

  // const replaceRoute = (crumbs: IBreadcrumbsItem) => {
  //   const route = crumbs.route;
  //   setActiveRoute(typeof route !== "undefined" ? route : "page404");
  //   setBreadcrumbs([crumbs]);
  // };

  return { pushRoute, breadcrumbs, activeRoute };
};

export default useDashboardRouter;
