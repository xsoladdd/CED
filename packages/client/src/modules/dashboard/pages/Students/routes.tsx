import dynamic from "next/dynamic";
import { FiUser } from "react-icons/fi";
import { IRoute } from "../../Layout/types";

const Students = dynamic(() => import(`.`), {
  suspense: true,
});

const studentsRoute: Array<IRoute> = [
  {
    component: Students,
    name: `students`,
    path: `students`,
    group: `main`,
    activePath: "students",
    logo: (props) => <FiUser {...props} />,
  },
];

export default studentsRoute;
