import dynamic from "next/dynamic";
import { FiMonitor } from "react-icons/fi";
import { IRoute } from "../../Layout/types";

const Dashboard = dynamic(() => import(`.`), {
  suspense: true,
});

const dashboardRoutes: Array<IRoute> = [
  {
    component: Dashboard,
    name: `dashboard`,
    path: `dashboard`,
    group: `main`,
    activePath: "dashboard",
    logo: (props) => <FiMonitor {...props} />,
  },
];

export default dashboardRoutes;
