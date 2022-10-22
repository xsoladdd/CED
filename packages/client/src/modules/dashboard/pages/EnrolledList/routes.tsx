import dynamic from "next/dynamic";
import { FiUser } from "react-icons/fi";
import { IRoute } from "../../Layout/types";

const EnrolledList = dynamic(() => import(`.`), {
  suspense: true,
});

const EnrollStudent = dynamic(() => import(`./Components/EnrollStudent`), {
  suspense: true,
});

const enrolledListRoute: Array<IRoute> = [
  {
    component: EnrolledList,
    name: `Enrolled List`,
    path: `enrolledList`,
    group: `main`,
    activePath: "enrolledList",
    logo: (props) => <FiUser {...props} />,
  },

  {
    component: EnrollStudent,
    name: `Enroll Student`,
    path: `enrolledList:add`,
    activePath: "enrolledList",
    logo: (props) => <FiUser {...props} />,
  },
];

export default enrolledListRoute;
