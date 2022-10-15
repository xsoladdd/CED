import dynamic from "next/dynamic";
import { FiSettings } from "react-icons/fi";
import { IRoute } from "../../../Layout/types";
const Settings = dynamic(() => import(`.`), {
  suspense: true,
});

const settingRoutes: Array<IRoute> = [
  {
    component: Settings,
    name: `Settings`,
    path: `settings`,
    group: "menuBar2",
    logo: (props) => <FiSettings {...props} />,
  },
];

export default settingRoutes;
