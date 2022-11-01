import { FormikProps } from "formik";
import React from "react";
import Text from "../../../../../../../components/Text";
import { generateInput } from "../../../../Shared/Components/StudentDetails/Components/helper";
import { IStudentAddingForm } from "./types";

const AcademicBackgroundForm: React.FC<{
  formik: FormikProps<IStudentAddingForm>;
}> = ({ formik }) => {
  const record = (idx: number) => {
    const errors =
      formik.errors.academicInfo &&
      formik.errors.academicInfo[idx] &&
      formik.errors.academicInfo[idx];

    const typedErrors = errors as {
      school?: string;
      schoolYear?: string;
    };
    return (
      <div className={`flex gap-3`} key={idx}>
        {generateInput({
          required: true,
          id: `academicInfo[${idx}].school`,
          label: "School",
          onChange: formik.handleChange,
          value: formik.values.academicInfo[idx]?.school,
          error: typedErrors?.school,
          touched:
            formik.touched.academicInfo &&
            formik.touched.academicInfo[idx]?.school,
          placeholder: "School",
          className: "w-3/5",
        })}
        {generateInput({
          // disabled: !isEditOn || !formik.values[idx]?.isActive,
          required: true,
          id: `academicInfo[${idx}]schoolYear`,
          label: "School Year",
          onChange: formik.handleChange,
          value: formik.values.academicInfo[idx]?.schoolYear,
          error: typedErrors?.schoolYear,
          touched:
            formik.touched.academicInfo &&
            formik.touched.academicInfo[idx]?.schoolYear,
          placeholder: "ex: 2014-2015",
          className: "w-1/5",
        })}
        {generateInput({
          // disabled: !isEditOn || !formik.values[idx]?.isActive,
          required: true,
          id: `academicInfo[${idx}]academicLevel`,
          label: "Academic Level :",
          onChange: formik.handleChange,
          value: formik.values.academicInfo[idx]?.academicLevel,
          // error: formik.errors.academicInfo[idx]?.academicLevel,
          // touched: formik.touched.academicInfo[idx]?.academicLevel,
          inputType: "select",
          selectValues: [
            { text: "Pre-Elementary", value: "Pre-Elementary" },
            { text: "Elementary", value: "Elementary" },
            { text: "Junior High", value: "Junior High" },
            { text: "Senior High", value: "Senior High" },
          ],
          className: "w-1/5",
        })}
      </div>
    );
  };
  return (
    <>
      <div className="">
        <Text className="font-semibold" variant="h5">
          Academic Information
        </Text>
        {
          <div className="flex gap-2 flex-col">
            {formik.values.academicInfo.map((_, idx) => record(idx))}
          </div>
        }
      </div>
    </>
  );
};
export default AcademicBackgroundForm;
