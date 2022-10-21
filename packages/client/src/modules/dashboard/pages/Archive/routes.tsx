import dynamic from "next/dynamic";
import { FiArchive } from "react-icons/fi";
import { IRoute } from "../../Layout/types";

const Archive = dynamic(() => import(`.`), {
  suspense: true,
});

const archiveRoutes: Array<IRoute> = [
  {
    component: Archive,
    name: `archive`,
    path: `archive`,
    group: `main`,
    activePath: "archive",
    logo: (props) => <FiArchive {...props} />,
  },
];

export default archiveRoutes;
