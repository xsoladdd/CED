import { IRoute } from "./Layout/types";
import profileRoutes from "./pages/MenuArea/Profile/routes";
import settingRoutes from "./pages/MenuArea/Settings/routes";
import accountRoutes from "./pages/Shared/Accounts/routes";
import dashboardRoutes from "./pages/Shared/Dashboard/routes";
import storeRoutes from "./pages/Shared/Stores/routes";
import categoriesRoutes from "./pages/Store/Categories/routes";
import productsRoutes from "./pages/Store/Products/routes";
import reportsRoutes from "./pages/Store/Reports/routes";
import testyRoutes from "./pages/Testy/routes";
import announcementRoutes from "./pages/Website/Announcement/routes";
import siteBuilderRoutes from "./pages/Website/SiteBuilder/routes";

const routes: Array<IRoute> = [
  ...dashboardRoutes,
  ...accountRoutes,
  ...storeRoutes,
  ...productsRoutes,
  ...categoriesRoutes,
  ...reportsRoutes,
  ...profileRoutes,
  ...settingRoutes,
  ...announcementRoutes,
  ...siteBuilderRoutes,
  ...testyRoutes,
];

export default routes;
