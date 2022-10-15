import dynamic from "next/dynamic";
import { FiActivity } from "react-icons/fi";
import { IRoute } from "../../../Layout/types";

const Reports = dynamic(() => import(`../../../pages/Store/Reports`), {
  suspense: true,
});

const reportsRoutes: Array<IRoute> = [
  {
    component: Reports,
    name: `Reports`,
    path: `reports`,
    group: "store",
    logo: (props) => <FiActivity {...props} />,
  },
];

export default reportsRoutes;
