import dynamic from "next/dynamic";
import { FiUser } from "react-icons/fi";
import { IRoute } from "../../Layout/types";

const Students = dynamic(() => import(`.`), {
  suspense: true,
});
const AddStudentsStepper = dynamic(
  () => import(`./Components/AddStudentStepper`),
  {
    suspense: true,
  }
);
const ImportStudent = dynamic(() => import(`./Components/ImportStudent`), {
  suspense: true,
});
const StudentDetails = dynamic(
  () => import(`../Shared/Components/StudentDetails`),
  {
    suspense: true,
  }
);

const studentsRoute = (role: string): Array<IRoute> =>
  ["BA", "RT"].includes(role)
    ? [
        {
          component: Students,
          name: `students`,
          path: `students`,
          group: `main`,
          activePath: "students",
          logo: (props) => <FiUser {...props} />,
        },
        {
          component: ImportStudent,
          name: `students`,
          path: `students:import-students`,
          activePath: "students",
        },
        {
          component: AddStudentsStepper,
          name: `students`,
          path: `students:add-stepper`,
          activePath: "students",
        },
        {
          component: StudentDetails,
          name: `students`,
          path: `students:view`,
          activePath: "students",
        },
      ]
    : [];

export default studentsRoute;
