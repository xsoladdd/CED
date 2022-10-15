import dynamic from "next/dynamic";
import { FiDatabase } from "react-icons/fi";
import { IRoute } from "../../../Layout/types";

const Products = dynamic(() => import(`.`), {
  suspense: true,
});

const productsRoutes: Array<IRoute> = [
  {
    component: Products,
    name: `products`,
    path: `products`,
    group: `store`,
    activePath: "products",
    logo: (props) => <FiDatabase {...props} />,
  },
];

export default productsRoutes;
