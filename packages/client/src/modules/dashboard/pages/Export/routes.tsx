import dynamic from "next/dynamic";
import { FiDownloadCloud } from "react-icons/fi";
import { IRoute } from "../../Layout/types";

const Export = dynamic(() => import(`.`), {
  suspense: true,
});

const exportRoutes: Array<IRoute> = [
  {
    component: Export,
    name: `export`,
    path: `export`,
    group: `main`,
    activePath: "export",
    logo: (props) => <FiDownloadCloud {...props} />,
  },
];

export default exportRoutes;
