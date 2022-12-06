import dynamic from "next/dynamic";
import { FiArchive } from "react-icons/fi";
import { IRoute } from "../../Layout/types";

const Archive = dynamic(() => import(`.`), {
  suspense: true,
});

const archiveRoute: Array<IRoute> = [
  {
    component: Archive,
    name: `Archive`,
    path: `archive`,
    group: `main`,
    activePath: "archive",
    logo: (props) => <FiArchive {...props} />,
  },
];

export default archiveRoute;
