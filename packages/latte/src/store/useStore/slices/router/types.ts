export interface IRouterSlice {
  router: {
    activeRoute: string;
    setActiveRoute: (route: string) => void;
    breadcrumbs: Array<IBreadcrumbsItem>;
    setBreadcrumbs: (crumbs: Array<IBreadcrumbsItem>) => void;
  };
}

export interface IBreadcrumbsItem {
  title: string;
  route?: string;
}
