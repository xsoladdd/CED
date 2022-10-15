import dynamic from "next/dynamic";
import { FiArchive } from "react-icons/fi";
import { IRoute } from "../../../Layout/types";

const Dashboard = dynamic(() => import(`.`), {
  suspense: true,
});

const dashboardRoutes: Array<IRoute> = [
  {
    component: Dashboard,
    name: `dashboard`,
    path: `dashboard`,
    group: `admin`,
    activePath: "dashboard",
    logo: (props) => <FiArchive {...props} />,
  },
];

export default dashboardRoutes;
