import dynamic from "next/dynamic";
import { FiPackage } from "react-icons/fi";
import { IRoute } from "../../../Layout/types";

const Stores = dynamic(() => import(`.`), {
  suspense: true,
});

const storeRoutes: Array<IRoute> = [
  {
    component: Stores,
    name: `stores`,
    path: `stores`,
    group: `admin`,
    activePath: "stores",
    logo: (props) => <FiPackage {...props} />,
  },
];

export default storeRoutes;
