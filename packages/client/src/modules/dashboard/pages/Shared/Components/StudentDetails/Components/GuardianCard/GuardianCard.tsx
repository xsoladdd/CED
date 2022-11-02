import { useFormik } from "formik";
import React from "react";
import { FiEdit, FiSave, FiX } from "react-icons/fi";
import Card, { CardHeader } from "../../../../../../../../components/Card";
import Text from "../../../../../../../../components/Text";
import WarningModal from "../../../../../../../../components/WarningModal";
import useToggle from "../../../../../../../../hooks/useToggle";
import useStore from "../../../../../../../../store/useStore";
import { generateInput } from "../helper";
import { guardianSchema } from "./helper";

const GuardianCard: React.FC = ({}) => {
  const { status: isEditOn, toggle } = useToggle(false);
  const { status: modalStatus, toggle: toggleModal } = useToggle(false);
  const {
    student: {
      setSelectedGuardianInfo,
      selectedStudent: { guardianInfo },
    },
  } = useStore();
  const formik = useFormik({
    initialValues: guardianInfo,
    // ? guardianInfo
    // : { ...defaultState.guardianInfo },
    validationSchema: guardianSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      // qwer Fix Submitting with API
      setSelectedGuardianInfo(values);
      console.log(values);
      toggle();
    },
  });
  const header = (
    <div className="w-full flex justify-between ">
      <CardHeader
        title={`Parent/Guardian Information`}
        subTitle={isEditOn ? "Edit" : ""}
      />
      {!isEditOn ? (
        <div className="flex gap-2">
          <button
            className="btn btn-xs btn-info"
            onClick={(e) => {
              e.preventDefault();
              toggle();
            }}
          >
            <FiEdit />
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <button className="btn btn-xs btn-success" type="submit">
            <FiSave />
          </button>
          <button
            className="btn btn-xs btn-error"
            onClick={(e) => {
              e.preventDefault();
              toggleModal();
            }}
          >
            <FiX />
          </button>
        </div>
      )}
    </div>
  );

  const fatherForm = (
    <>
      <div>
        <Text className="font-semibold" variant="h5">
          Father
        </Text>
        <div className="flex gap-3">
          {generateInput({
            disabled: !isEditOn,
            required: true,
            id: "father.firstName",
            label: "First name :",
            onChange: formik.handleChange,
            value: formik.values.father.firstName,
            error: formik.errors.father?.firstName,
            touched: formik.touched.father?.firstName,
            placeholder: "First Name",
            className: "w-1/3",
          })}

          {generateInput({
            disabled: !isEditOn,
            id: "father.middleName",
            label: "Middle name :",
            onChange: formik.handleChange,
            value: formik.values.father.middleName,
            error: formik.errors.father?.middleName,
            touched: formik.touched.father?.middleName,
            placeholder: "Middle Name",
            className: "w-1/3",
          })}

          {generateInput({
            disabled: !isEditOn,
            required: true,
            id: "father.lastName",
            label: "Last name :",
            onChange: formik.handleChange,
            value: formik.values.father.lastName,
            error: formik.errors.father?.lastName,
            touched: formik.touched.father?.lastName,
            placeholder: "Last Name",
            className: "w-1/3",
          })}
        </div>
        <div className="flex gap-3">
          {generateInput({
            disabled: !isEditOn,
            required: true,
            id: "father.email",
            label: "Email :",
            onChange: formik.handleChange,
            value: formik.values.father.email,
            error: formik.errors.father?.email,
            touched: formik.touched.father?.email,
            placeholder: "Email address",
            className: "w-1/2",
          })}

          {generateInput({
            disabled: !isEditOn,
            required: true,
            id: "father.mobileNumber",
            label: "Mobile Number :",
            onChange: formik.handleChange,
            value: formik.values.father.mobileNumber,
            error: formik.errors.father?.mobileNumber,
            touched: formik.touched.father?.mobileNumber,
            placeholder: "Mobile Number",
            className: "w-1/2",
          })}
        </div>
      </div>
    </>
  );

  const motherForm = (
    <div>
      <Text className="font-semibold" variant="h5">
        Mother :
      </Text>
      <div className="flex gap-3">
        {generateInput({
          disabled: !isEditOn,
          required: true,
          id: "mother.firstName",
          label: "First name :",
          onChange: formik.handleChange,
          value: formik.values.mother.firstName,
          error: formik.errors.mother?.firstName,
          touched: formik.touched.mother?.firstName,
          placeholder: "First Name",
          className: "w-1/3",
        })}

        {generateInput({
          disabled: !isEditOn,
          id: "mother.middleName",
          label: "Middle name :",
          onChange: formik.handleChange,
          value: formik.values.mother.middleName,
          error: formik.errors.mother?.middleName,
          touched: formik.touched.mother?.middleName,
          placeholder: "Middle Name",
          className: "w-1/3",
        })}

        {generateInput({
          disabled: !isEditOn,
          required: true,
          id: "mother.lastName",
          label: "Last name :",
          onChange: formik.handleChange,
          value: formik.values.mother.lastName,
          error: formik.errors.mother?.lastName,
          touched: formik.touched.mother?.lastName,
          placeholder: "Last Name",
          className: "w-1/3",
        })}
      </div>
      <div className="flex gap-3">
        {generateInput({
          disabled: !isEditOn,
          required: true,
          id: "mother.email",
          label: "Email :",
          onChange: formik.handleChange,
          value: formik.values.mother.email,
          error: formik.errors.mother?.email,
          touched: formik.touched.mother?.email,
          placeholder: "Email address",
          className: "w-1/2",
        })}

        {generateInput({
          disabled: !isEditOn,
          required: true,
          id: "mother.mobileNumber",
          label: "Mobile Number :",
          onChange: formik.handleChange,
          value: formik.values.mother.mobileNumber,
          error: formik.errors.mother?.mobileNumber,
          touched: formik.touched.mother?.mobileNumber,
          placeholder: "Mobile Number",
          className: "w-1/2",
        })}
      </div>
    </div>
  );

  const guardianForm = (
    <div className="w-full">
      <Text className="font-semibold" variant="h5">
        Guardian :
      </Text>
      <div className="flex gap-3">
        {generateInput({
          disabled: !isEditOn,
          required: true,
          id: "guardian.firstName",
          label: "First name :",
          onChange: formik.handleChange,
          value: formik.values.guardian.firstName,
          error: formik.errors.guardian?.firstName,
          touched: formik.touched.guardian?.firstName,
          placeholder: "First Name",
          className: "w-1/3",
        })}

        {generateInput({
          disabled: !isEditOn,
          id: "guardian.middleName",
          label: "Middle name :",
          onChange: formik.handleChange,
          value: formik.values.guardian.middleName,
          error: formik.errors.guardian?.middleName,
          touched: formik.touched.guardian?.middleName,
          placeholder: "Middle Name",
          className: "w-1/3",
        })}

        {generateInput({
          disabled: !isEditOn,
          required: true,
          id: "guardian.lastName",
          label: "Last name :",
          onChange: formik.handleChange,
          value: formik.values.guardian.lastName,
          error: formik.errors.guardian?.lastName,
          touched: formik.touched.guardian?.lastName,
          placeholder: "Last Name",
          className: "w-1/3",
        })}
      </div>

      <div className="flex gap-3">
        {generateInput({
          disabled: !isEditOn,
          required: true,
          id: "guardian.email",
          label: "Email :",
          onChange: formik.handleChange,
          value: formik.values.guardian.email,
          error: formik.errors.guardian?.email,
          touched: formik.touched.guardian?.email,
          placeholder: "Email address",
          className: "w-1/2",
        })}

        {generateInput({
          disabled: !isEditOn,
          required: true,
          id: "guardian.mobileNumber",
          label: "Mobile Number :",
          onChange: formik.handleChange,
          value: formik.values.guardian.mobileNumber,
          error: formik.errors.guardian?.mobileNumber,
          touched: formik.touched.guardian?.mobileNumber,
          placeholder: "Mobile Number",
          className: "w-1/2",
        })}
      </div>
    </div>
  );
  return (
    <>
      <WarningModal
        status={modalStatus}
        handleClose={() => toggleModal()}
        handleProceed={() => {
          formik.resetForm();
          toggle();
          toggleModal();
        }}
      >
        {`Changes won't be save. are you sure you want to cancel?`}
      </WarningModal>
      <form className="w-full" onSubmit={formik.handleSubmit}>
        <Card className="w-full" header={header}>
          <div className="flex gap-4 flex-col">
            {fatherForm}
            {motherForm}
            {guardianForm}
          </div>
        </Card>
      </form>
    </>
  );
};
export default GuardianCard;
