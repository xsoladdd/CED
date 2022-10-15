import dynamic from "next/dynamic";
import { FiAirplay } from "react-icons/fi";
import { IRoute } from "../../../Layout/types";
const SiteDesign = dynamic(() => import(`.`), {
  suspense: true,
});
const siteBuilderRoutes: Array<IRoute> = [
  {
    component: SiteDesign,
    name: `Site Builder`,
    path: `site-design`,
    group: "website",
    logo: (props) => <FiAirplay {...props} />,
  },
];

export default siteBuilderRoutes;
