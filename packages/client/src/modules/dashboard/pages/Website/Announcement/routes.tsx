import dynamic from "next/dynamic";
import { FiRadio } from "react-icons/fi";
import { IRoute } from "../../../Layout/types";

const Announcement = dynamic(() => import(`.`), {
  suspense: true,
});
const announcementRoutes: Array<IRoute> = [
  {
    component: Announcement,
    name: `Announcement`,
    path: `announcement`,
    group: "website",
    logo: (props) => <FiRadio {...props} />,
  },
];

export default announcementRoutes;
