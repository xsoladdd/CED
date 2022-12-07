import { IRoute } from "./Layout/types";
import archiveRoute from "./pages/Archive/routes";
import auditTrailRoutes from "./pages/AuditTrail/routes";
import dashboardRoutes from "./pages/Dashboard/routes";
import employeesRoutes from "./pages/Employees/routes";
import enrolledListRoute from "./pages/EnrolledList/routes";
import settingsRoutes from "./pages/Settings/routes";
import studentsRoutes from "./pages/Students/routes";

const generateRoutes = (role: string): Array<IRoute> => [
  ...dashboardRoutes,
  ...enrolledListRoute(role),
  ...studentsRoutes(role),
  ...archiveRoute(role),
  ...employeesRoutes(role),
  ...auditTrailRoutes(role),
  ...settingsRoutes,
];

export default generateRoutes;
