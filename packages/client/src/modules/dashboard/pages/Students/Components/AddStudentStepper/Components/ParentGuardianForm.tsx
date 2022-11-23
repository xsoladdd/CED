import { FormikProps } from "formik";
import React from "react";
import Text from "../../../../../../../components/Text";
import { IselectedStudentState } from "../../../../../../../store/useStore/slices/student/types";
import { generateInput } from "../../../../Shared/Components/StudentDetails/Components/helper";

const ParentGuardianForm: React.FC<{
  formik: FormikProps<IselectedStudentState>;
}> = ({ formik }) => {
  const fatherForm = (
    <>
      <div>
        <Text className="font-semibold" variant="h6">
          Father :
        </Text>
        <div className="flex gap-3">
          {generateInput({
            required: !!formik.values.guardianInfo.father.first_name,
            id: "guardianInfo.father.first_name",
            label: "First name :",
            onChange: formik.handleChange,
            value: formik.values.guardianInfo?.father.first_name,
            error: formik.errors.guardianInfo?.father?.first_name,
            touched: formik.touched.guardianInfo?.father?.first_name,
            placeholder: "First Name",
            className: "w-1/3",
          })}

          {generateInput({
            id: "guardianInfo.father.middle_name",
            label: "Middle name :",
            onChange: formik.handleChange,
            value: formik.values.guardianInfo.father.middle_name,
            error: formik.errors.guardianInfo?.father?.middle_name,
            touched: formik.touched.guardianInfo?.father?.middle_name,
            placeholder: "Middle Name",
            className: "w-1/3",
          })}

          {generateInput({
            required: !!formik.values.guardianInfo.father.first_name,
            id: "guardianInfo.father.last_name",
            label: "Last name :",
            onChange: formik.handleChange,
            value: formik.values.guardianInfo.father.last_name,
            error: formik.errors.guardianInfo?.father?.last_name,
            touched: formik.touched.guardianInfo?.father?.last_name,
            placeholder: "Last Name",
            className: "w-1/3",
          })}
        </div>
        <div className="flex gap-3">
          {generateInput({
            required: !!formik.values.guardianInfo.father.first_name,
            id: "guardianInfo.father.email",
            label: "Email :",
            onChange: formik.handleChange,
            value: formik.values.guardianInfo.father.email,
            error: formik.errors.guardianInfo?.father?.email,
            touched: formik.touched.guardianInfo?.father?.email,
            placeholder: "Email address",
            className: "w-1/2",
          })}

          {generateInput({
            required: !!formik.values.guardianInfo.father.first_name,
            id: "guardianInfo.father.contact_number",
            label: "Mobile Number :",
            onChange: formik.handleChange,
            value: formik.values.guardianInfo.father.contact_number,
            error: formik.errors.guardianInfo?.father?.contact_number,
            touched: formik.touched.guardianInfo?.father?.contact_number,
            placeholder: "Mobile Number",
            className: "w-1/2",
          })}
        </div>
      </div>
    </>
  );

  const motherForm = (
    <div>
      <Text className="font-semibold" variant="h6">
        Mother :
      </Text>
      <div className="flex gap-3">
        {generateInput({
          required: !!formik.values.guardianInfo.mother.first_name,
          id: "guardianInfo.mother.first_name",
          label: "First name :",
          onChange: formik.handleChange,
          value: formik.values.guardianInfo.mother.first_name,
          error: formik.errors.guardianInfo?.mother?.first_name,
          touched: formik.touched.guardianInfo?.mother?.first_name,
          placeholder: "First Name",
          className: "w-1/3",
        })}

        {generateInput({
          id: "guardianInfo.mother.middle_name",
          label: "Middle name :",
          onChange: formik.handleChange,
          value: formik.values.guardianInfo.mother.middle_name,
          error: formik.errors.guardianInfo?.mother?.middle_name,
          touched: formik.touched.guardianInfo?.mother?.middle_name,
          placeholder: "Middle Name",
          className: "w-1/3",
        })}

        {generateInput({
          required: !!formik.values.guardianInfo.mother.first_name,
          id: "guardianInfo.mother.last_name",
          label: "Last name :",
          onChange: formik.handleChange,
          value: formik.values.guardianInfo.mother.last_name,
          error: formik.errors.guardianInfo?.mother?.last_name,
          touched: formik.touched.guardianInfo?.mother?.last_name,
          placeholder: "Last Name",
          className: "w-1/3",
        })}
      </div>
      <div className="flex gap-3">
        {generateInput({
          required: !!formik.values.guardianInfo.mother.first_name,
          id: "guardianInfo.mother.email",
          label: "Email :",
          onChange: formik.handleChange,
          value: formik.values.guardianInfo.mother.email,
          error: formik.errors.guardianInfo?.mother?.email,
          touched: formik.touched.guardianInfo?.mother?.email,
          placeholder: "Email address",
          className: "w-1/2",
        })}

        {generateInput({
          required: !!formik.values.guardianInfo.mother.first_name,
          id: "guardianInfo.mother.contact_number",
          label: "Mobile Number :",
          onChange: formik.handleChange,
          value: formik.values.guardianInfo.mother.contact_number,
          error: formik.errors.guardianInfo?.mother?.contact_number,
          touched: formik.touched.guardianInfo?.mother?.contact_number,
          placeholder: "Mobile Number",
          className: "w-1/2",
        })}
      </div>
    </div>
  );

  const guardianForm = (
    <div className="w-full">
      <Text className="font-semibold" variant="h6">
        Guardian :
      </Text>
      <div className="flex gap-3">
        {generateInput({
          required: !!formik.values.guardianInfo.guardian.first_name,
          id: "guardianInfo.guardian.first_name",
          label: "First name :",
          onChange: formik.handleChange,
          value: formik.values.guardianInfo.guardian.first_name,
          error: formik.errors.guardianInfo?.guardian?.first_name,
          touched: formik.touched.guardianInfo?.guardian?.first_name,
          placeholder: "First Name",
          className: "w-1/3",
        })}

        {generateInput({
          id: "guardianInfo.guardian.middle_name",
          label: "Middle name :",
          onChange: formik.handleChange,
          value: formik.values.guardianInfo.guardian.middle_name,
          error: formik.errors.guardianInfo?.guardian?.middle_name,
          touched: formik.touched.guardianInfo?.guardian?.middle_name,
          placeholder: "Middle Name",
          className: "w-1/3",
        })}

        {generateInput({
          required: !!formik.values.guardianInfo.guardian.first_name,
          id: "guardianInfo.guardian.last_name",
          label: "Last name :",
          onChange: formik.handleChange,
          value: formik.values.guardianInfo.guardian.last_name,
          error: formik.errors.guardianInfo?.guardian?.last_name,
          touched: formik.touched.guardianInfo?.guardian?.last_name,
          placeholder: "Last Name",
          className: "w-1/3",
        })}
      </div>

      <div className="flex gap-3">
        {generateInput({
          required: !!formik.values.guardianInfo.guardian.first_name,
          id: "guardianInfo.guardian.email",
          label: "Email :",
          onChange: formik.handleChange,
          value: formik.values.guardianInfo.guardian.email,
          error: formik.errors.guardianInfo?.guardian?.email,
          touched: formik.touched.guardianInfo?.guardian?.email,
          placeholder: "Email address",
          className: "w-1/2",
        })}

        {generateInput({
          required: !!formik.values.guardianInfo.guardian.first_name,
          id: "guardianInfo.guardian.contact_number",
          label: "Mobile Number :",
          onChange: formik.handleChange,
          value: formik.values.guardianInfo.guardian.contact_number,
          error: formik.errors.guardianInfo?.guardian?.contact_number,
          touched: formik.touched.guardianInfo?.guardian?.contact_number,
          placeholder: "Mobile Number",
          className: "w-1/2",
        })}
      </div>
    </div>
  );
  return (
    <>
      <div className="flex flex-col gap-3">
        {motherForm}
        {fatherForm}
        {guardianForm}
      </div>
    </>
  );
};
export default ParentGuardianForm;
