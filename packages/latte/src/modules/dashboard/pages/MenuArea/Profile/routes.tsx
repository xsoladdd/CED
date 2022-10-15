import dynamic from "next/dynamic";
import { FiUser } from "react-icons/fi";
import { IRoute } from "../../../Layout/types";

const Profile = dynamic(() => import(`.`), {
  suspense: true,
});

const profileRoutes: Array<IRoute> = [
  {
    component: Profile,
    name: `Profile`,
    path: `profile`,
    group: "menuBar1",
    logo: (props) => <FiUser {...props} />,
  },
];

export default profileRoutes;
