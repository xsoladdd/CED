import dynamic from "next/dynamic";
import { FiDatabase } from "react-icons/fi";
import { IRoute } from "../../Layout/types";

const Employees = dynamic(() => import(`.`), {
  suspense: true,
});
const AddEmployee = dynamic(() => import(`./Components/AddEmployee`), {
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
  {
    component: AddEmployee,
    name: `Add Employee`,
    path: `employees:add`,
    activePath: "employees",
  },
];

export default employeesRoutes;
