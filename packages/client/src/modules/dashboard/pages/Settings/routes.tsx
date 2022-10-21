import dynamic from "next/dynamic";
import { FiSettings } from "react-icons/fi";
import { IRoute } from "../../Layout/types";

const Settings = dynamic(() => import(`.`), {
  suspense: true,
});

const settingsRoutes: Array<IRoute> = [
  {
    component: Settings,
    name: `settings`,
    path: `settings`,
    group: `main`,
    activePath: "settings",
    logo: (props) => <FiSettings {...props} />,
  },
];

export default settingsRoutes;
