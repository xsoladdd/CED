import { Student } from "../../../../../../graphQL/generated/graphql";

export interface IEnrollmentForm {
  student_id?: string;
  student?: Student;
  section?: string;
  year_level?: string;
}
