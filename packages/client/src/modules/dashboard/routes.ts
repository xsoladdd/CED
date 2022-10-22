import { IRoute } from "./Layout/types";
import auditTrailRoutes from "./pages/AuditTrail/routes";
import dashboardRoutes from "./pages/Dashboard/routes";
import employeesRoutes from "./pages/Employees/routes";
import enrolledListRoute from "./pages/EnrolledList/routes";
import profileRoutes from "./pages/MenuArea/Profile/routes";
import settingsRoutes from "./pages/Settings/routes";
import studentsRoutes from "./pages/Students/routes";
import testyRoutes from "./pages/Testy/routes";

const routes: Array<IRoute> = [
  ...dashboardRoutes,
  ...enrolledListRoute,
  ...studentsRoutes,
  ...employeesRoutes,
  ...auditTrailRoutes,
  ...settingsRoutes,

  // Top Menu
  ...profileRoutes,

  // Test
  ...testyRoutes,
];

export default routes;
