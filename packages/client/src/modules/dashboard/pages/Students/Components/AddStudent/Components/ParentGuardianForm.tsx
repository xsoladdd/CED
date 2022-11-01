import { FormikProps } from "formik";
import React from "react";
import Text from "../../../../../../../components/Text";
import { generateInput } from "../../../../Shared/Components/StudentDetails/Components/helper";
import { IStudentAddingForm } from "./types";

const ParentGuardianForm: React.FC<{
  formik: FormikProps<IStudentAddingForm>;
}> = ({ formik }) => {
  const fatherForm = (
    <>
      <div>
        <Text className="font-semibold" variant="h6">
          Father :
        </Text>
        <div className="flex gap-3">
          {generateInput({
            required: !!formik.values.guardianInfo.father.firstName,
            id: "guardianInfo.father.firstName",
            label: "First name :",
            onChange: formik.handleChange,
            value: formik.values.guardianInfo?.father.firstName,
            error: formik.errors.guardianInfo?.father?.firstName,
            touched: formik.touched.guardianInfo?.father?.firstName,
            placeholder: "First Name",
            className: "w-1/3",
          })}

          {generateInput({
            id: "guardianInfo.father.middleName",
            label: "Middle name :",
            onChange: formik.handleChange,
            value: formik.values.guardianInfo.father.middleName,
            error: formik.errors.guardianInfo?.father?.middleName,
            touched: formik.touched.guardianInfo?.father?.middleName,
            placeholder: "Middle Name",
            className: "w-1/3",
          })}

          {generateInput({
            required: !!formik.values.guardianInfo.father.firstName,
            id: "guardianInfo.father.lastName",
            label: "Last name :",
            onChange: formik.handleChange,
            value: formik.values.guardianInfo.father.lastName,
            error: formik.errors.guardianInfo?.father?.lastName,
            touched: formik.touched.guardianInfo?.father?.lastName,
            placeholder: "Last Name",
            className: "w-1/3",
          })}
        </div>
        <div className="flex gap-3">
          {generateInput({
            required: !!formik.values.guardianInfo.father.firstName,
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
            required: !!formik.values.guardianInfo.father.firstName,
            id: "guardianInfo.father.mobileNumber",
            label: "Mobile Number :",
            onChange: formik.handleChange,
            value: formik.values.guardianInfo.father.mobileNumber,
            error: formik.errors.guardianInfo?.father?.mobileNumber,
            touched: formik.touched.guardianInfo?.father?.mobileNumber,
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
          required: !!formik.values.guardianInfo.mother.firstName,
          id: "guardianInfo.mother.firstName",
          label: "First name :",
          onChange: formik.handleChange,
          value: formik.values.guardianInfo.mother.firstName,
          error: formik.errors.guardianInfo?.mother?.firstName,
          touched: formik.touched.guardianInfo?.mother?.firstName,
          placeholder: "First Name",
          className: "w-1/3",
        })}

        {generateInput({
          id: "guardianInfo.mother.middleName",
          label: "Middle name :",
          onChange: formik.handleChange,
          value: formik.values.guardianInfo.mother.middleName,
          error: formik.errors.guardianInfo?.mother?.middleName,
          touched: formik.touched.guardianInfo?.mother?.middleName,
          placeholder: "Middle Name",
          className: "w-1/3",
        })}

        {generateInput({
          required: !!formik.values.guardianInfo.mother.firstName,
          id: "guardianInfo.mother.lastName",
          label: "Last name :",
          onChange: formik.handleChange,
          value: formik.values.guardianInfo.mother.lastName,
          error: formik.errors.guardianInfo?.mother?.lastName,
          touched: formik.touched.guardianInfo?.mother?.lastName,
          placeholder: "Last Name",
          className: "w-1/3",
        })}
      </div>
      <div className="flex gap-3">
        {generateInput({
          required: !!formik.values.guardianInfo.mother.firstName,
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
          required: !!formik.values.guardianInfo.mother.firstName,
          id: "guardianInfo.mother.mobileNumber",
          label: "Mobile Number :",
          onChange: formik.handleChange,
          value: formik.values.guardianInfo.mother.mobileNumber,
          error: formik.errors.guardianInfo?.mother?.mobileNumber,
          touched: formik.touched.guardianInfo?.mother?.mobileNumber,
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
          required: !!formik.values.guardianInfo.guardian.firstName,
          id: "guardianInfo.guardian.firstName",
          label: "First name :",
          onChange: formik.handleChange,
          value: formik.values.guardianInfo.guardian.firstName,
          error: formik.errors.guardianInfo?.guardian?.firstName,
          touched: formik.touched.guardianInfo?.guardian?.firstName,
          placeholder: "First Name",
          className: "w-1/3",
        })}

        {generateInput({
          id: "guardianInfo.guardian.middleName",
          label: "Middle name :",
          onChange: formik.handleChange,
          value: formik.values.guardianInfo.guardian.middleName,
          error: formik.errors.guardianInfo?.guardian?.middleName,
          touched: formik.touched.guardianInfo?.guardian?.middleName,
          placeholder: "Middle Name",
          className: "w-1/3",
        })}

        {generateInput({
          required: !!formik.values.guardianInfo.guardian.firstName,
          id: "guardianInfo.guardian.lastName",
          label: "Last name :",
          onChange: formik.handleChange,
          value: formik.values.guardianInfo.guardian.lastName,
          error: formik.errors.guardianInfo?.guardian?.lastName,
          touched: formik.touched.guardianInfo?.guardian?.lastName,
          placeholder: "Last Name",
          className: "w-1/3",
        })}
      </div>

      <div className="flex gap-3">
        {generateInput({
          required: !!formik.values.guardianInfo.guardian.firstName,
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
          required: !!formik.values.guardianInfo.guardian.firstName,
          id: "guardianInfo.guardian.mobileNumber",
          label: "Mobile Number :",
          onChange: formik.handleChange,
          value: formik.values.guardianInfo.guardian.mobileNumber,
          error: formik.errors.guardianInfo?.guardian?.mobileNumber,
          touched: formik.touched.guardianInfo?.guardian?.mobileNumber,
          placeholder: "Mobile Number",
          className: "w-1/2",
        })}
      </div>
    </div>
  );
  return (
    <>
      <div className="flex flex-col gap-3">
        <Text className="font-semibold" variant="h5">
          Basic Information
        </Text>
        {motherForm}
        {fatherForm}
        {guardianForm}
      </div>
    </>
  );
};
export default ParentGuardianForm;
