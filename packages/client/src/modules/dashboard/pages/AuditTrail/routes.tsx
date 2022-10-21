import dynamic from "next/dynamic";
import { FiBook } from "react-icons/fi";
import { IRoute } from "../../Layout/types";

const AuditTrail = dynamic(() => import(`.`), {
  suspense: true,
});

const auditTrailRoutes: Array<IRoute> = [
  {
    component: AuditTrail,
    name: `auditTrail`,
    path: `auditTrail`,
    group: `main`,
    activePath: "auditTrail",
    logo: (props) => <FiBook {...props} />,
  },
];

export default auditTrailRoutes;
