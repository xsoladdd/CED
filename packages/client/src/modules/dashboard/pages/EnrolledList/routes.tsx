import dynamic from "next/dynamic";
import { FiList } from "react-icons/fi";
import { IRoute } from "../../Layout/types";

const EnrolledList = dynamic(() => import(`.`), {
  suspense: true,
});

const RegCard = dynamic(() => import(`./Components/RegCard`), {
  suspense: true,
});

const StudentDetails = dynamic(
  () => import(`../Shared/Components/StudentDetails`),
  {
    suspense: true,
  }
);

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
    logo: (props) => <FiList {...props} />,
  },
  {
    component: EnrollStudent,
    name: `Enroll Student`,
    path: `enrolledList:add`,
    activePath: "enrolledList",
  },
  {
    component: RegCard,
    name: `Registration Card`,
    path: `enrolledList:regCard`,
    activePath: "enrolledList",
  },
  {
    component: StudentDetails,
    name: `Student Details`,
    path: `enrolledList:studentDetails`,
    activePath: "enrolledList",
  },
];

export default enrolledListRoute;
