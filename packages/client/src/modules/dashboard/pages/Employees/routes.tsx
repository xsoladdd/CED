import dynamic from "next/dynamic";
import { FiDatabase } from "react-icons/fi";
import { IRoute } from "../../Layout/types";

const Employees = dynamic(() => import(`.`), {
  suspense: true,
});

const employeesRoutes: Array<IRoute> = [
  {
    component: Employees,
    name: `employees`,
    path: `employees`,
    group: `main`,
    activePath: "employees",
    logo: (props) => <FiDatabase {...props} />,
  },
];

export default employeesRoutes;
