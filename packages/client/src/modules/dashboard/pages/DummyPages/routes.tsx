import dynamic from "next/dynamic";
import { FiUser } from "react-icons/fi";
import { IRoute } from "../../Layout/types";

const P1 = dynamic(() => import(`./Page2`), {
  suspense: true,
});
const P2 = dynamic(() => import(`./Page2`), {
  suspense: true,
});

const dummyRoutes: Array<IRoute> = [
  {
    component: P1,
    name: `Page 1`,
    path: `page1`,
    group: "website",
    logo: (props: any) => <FiUser {...props} />,
  },
  {
    component: P2,
    name: `Page 2`,
    path: `page2`,
    group: "website",
    logo: (props: any) => <FiUser {...props} />,
  },
];

export default dummyRoutes;
