import { IRoute } from "./Layout/types";
import profileRoutes from "./pages/MenuArea/Profile/routes";
import dashboardRoutes from "./pages/Dashboard/routes";
import testyRoutes from "./pages/Testy/routes";
import studentsRoutes from "./pages/Students/routes";
import archiveRoutes from "./pages/Archive/routes";
import employeesRoutes from "./pages/Employees/routes";
import settingsRoutes from "./pages/Settings/routes";
import auditTrailRoutes from "./pages/AuditTrail/routes";

const routes: Array<IRoute> = [
  ...dashboardRoutes,
  ...studentsRoutes,
  ...archiveRoutes,
  ...employeesRoutes,
  ...auditTrailRoutes,
  ...settingsRoutes,

  // Top Menu
  ...profileRoutes,

  // Test
  ...testyRoutes,
];

export default routes;
