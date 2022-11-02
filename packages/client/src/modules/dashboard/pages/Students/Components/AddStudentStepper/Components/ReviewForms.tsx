import { FormikProps } from "formik";
import React from "react";
import { IselectedStudentState } from "../../../../../../../store/useStore/slices/student/types";

const ReviewForms: React.FC<{
  formik: FormikProps<IselectedStudentState>;
}> = ({ formik }) => {
  return <>{JSON.stringify(formik.values)}</>;
};
export default ReviewForms;
