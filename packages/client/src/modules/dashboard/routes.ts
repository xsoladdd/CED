import { IRoute } from "./Layout/types";
import dummyRoutes from "./pages/DummyPages/routes";
import profileRoutes from "./pages/MenuArea/Profile/routes";
import settingRoutes from "./pages/MenuArea/Settings/routes";
import dashboardRoutes from "./pages/Shared/Dashboard/routes";
import reportsRoutes from "./pages/Store/Reports/routes";
import testyRoutes from "./pages/Testy/routes";

const routes: Array<IRoute> = [
  ...dashboardRoutes,
  // ...accountRoutes,
  ...reportsRoutes,
  ...profileRoutes,
  ...settingRoutes,
  // ...announcementRoutes,
  // ...siteBuilderRoutes,
  ...testyRoutes,
  ...dummyRoutes,
];

export default routes;
