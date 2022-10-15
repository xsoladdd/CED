import dynamic from "next/dynamic";
import { FiUsers } from "react-icons/fi";
import { IRoute } from "../../../Layout/types";

const Account = dynamic(() => import(`.`), {
  suspense: true,
});

const AccountInfo = dynamic(() => import(`./Info`), {
  suspense: true,
});

const AccountAccess = dynamic(() => import(`./Access`), {
  suspense: true,
});

const NewAccount = dynamic(() => import(`./NewAccount`), {
  suspense: true,
});
const accountRoutes: Array<IRoute> = [
  {
    component: Account,
    name: `accounts`,
    path: `accounts`,
    group: `admin`,
    activePath: "accounts",
    logo: (props) => <FiUsers {...props} />,
  },
  {
    component: AccountInfo,
    name: `info`,
    path: `accounts:info`,
    activePath: "accounts",
  },
  {
    component: AccountAccess,
    name: `info`,
    path: `accounts:access`,
    activePath: "accounts",
  },
  {
    component: NewAccount,
    name: `info`,
    path: `accounts:new`,
    activePath: "accounts",
  },
];

export default accountRoutes;
