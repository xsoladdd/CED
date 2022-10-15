import dynamic from "next/dynamic";
import { FiSend } from "react-icons/fi";
import { IRoute } from "../../Layout/types";

const Testy = dynamic(() => import(`.`), {
  suspense: true,
});
const testyRoutes: Array<IRoute> = [
  {
    component: Testy,
    name: `Testy`,
    path: `testy`,
    group: "website",
    logo: (props) => <FiSend {...props} />,
  },
];

export default testyRoutes;
