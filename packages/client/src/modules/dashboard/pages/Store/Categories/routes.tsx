import dynamic from "next/dynamic";
import { FiGrid } from "react-icons/fi";
import { IRoute } from "../../../Layout/types";
const Categories = dynamic(() => import(`../../../pages/Store/Categories`), {
  suspense: true,
});

const categoriesRoutes: Array<IRoute> = [
  {
    component: Categories,
    name: `Categories`,
    path: `categories`,
    group: "store",
    logo: (props) => <FiGrid {...props} />,
  },
];

export default categoriesRoutes;
