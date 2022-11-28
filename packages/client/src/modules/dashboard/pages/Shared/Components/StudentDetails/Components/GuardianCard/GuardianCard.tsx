import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import React from "react";
import { FiEdit, FiSave, FiX } from "react-icons/fi";
import Card, { CardHeader } from "../../../../../../../../components/Card";
import Text from "../../../../../../../../components/Text";
import WarningModal from "../../../../../../../../components/WarningModal";
import { UpdateStudentParentInfoDocument } from "../../../../../../../../graphQL/generated/graphql";
import useToggle from "../../../../../../../../hooks/useToggle";
import useStore from "../../../../../../../../store/useStore";
import { generateInput } from "../helper";
import { guardianSchema } from "./helper";

const GuardianCard: React.FC = ({}) => {
  const { status: isEditOn, toggle } = useToggle(false);
  const { status: modalStatus, toggle: toggleModal } = useToggle(false);
  const {
    student: {
      selectedStudent: { parent_guardians, id },
    },
  } = useStore();

  const [updateStudentParentInfo] = useMutation(
    UpdateStudentParentInfoDocument
  );
  const formik = useFormik({
    initialValues: {
      father: {
        ...(parent_guardians?.filter((props) => props?.type === "F").length !==
          0 && parent_guardians?.filter((props) => props?.type === "F")[0]),
      },
      mother: {
        ...(parent_guardians?.filter((props) => props?.type === "M").length !==
          0 && parent_guardians?.filter((props) => props?.type === "M")[0]),
      },
      guardian: {
        ...(parent_guardians?.filter((props) => props?.type === "G").length !==
          0 && parent_guardians?.filter((props) => props?.type === "G")[0]),
      },
    },
    validationSchema: guardianSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      // qwer Fix Submitting with API
      updateStudentParentInfo({
        variables: {
          id: id as string,
          input: {
            father: values.father.first_name
              ? {
                  email: values.father.email ? values.father.email : "",
                  first_name: values.father.first_name
                    ? values.father.first_name
                    : "",
                  middle_name: values.father.middle_name
                    ? values.father.middle_name
                    : "",
                  last_name: values.father.last_name
                    ? values.father.last_name
                    : "",
                  contact_number: values.father.contact_number
                    ? values.father.contact_number
                    : "",
                  id: values.father.id ? values.father.id : undefined,
                }
              : undefined,
            mother: values.mother.first_name
              ? {
                  email: values.mother.email ? values.mother.email : "",
                  first_name: values.mother.first_name
                    ? values.mother.first_name
                    : "",
                  middle_name: values.mother.middle_name
                    ? values.mother.middle_name
                    : "",
                  last_name: values.mother.last_name
                    ? values.mother.last_name
                    : "",
                  contact_number: values.mother.contact_number,

                  id: values.mother.id ? values.mother.id : undefined,
                }
              : undefined,
            guardian: values.guardian.first_name
              ? {
                  email: values.guardian.email ? values.guardian.email : "",
                  first_name: values.guardian.first_name
                    ? values.guardian.first_name
                    : "",
                  middle_name: values.guardian.middle_name
                    ? values.guardian.middle_name
                    : "",
                  last_name: values.guardian.last_name
                    ? values.guardian.last_name
                    : "",
                  contact_number: values.guardian.contact_number,

                  id: values.guardian.id ? values.guardian.id : undefined,
                }
              : undefined,
          },
        },
        onCompleted: () => {
          console.log(values);
          toggle();
        },
      });
      // toggle();
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
            id: "father.first_name",
            label: "First name :",
            onChange: formik.handleChange,
            value: formik.values.father?.first_name
              ? formik.values.father?.first_name
              : "",
            error: formik.errors.father?.first_name,
            touched: formik.touched.father?.first_name,
            placeholder: "First Name",
            className: "w-1/3",
          })}

          {generateInput({
            disabled: !isEditOn,
            id: "father.middle_name",
            label: "Middle name :",
            onChange: formik.handleChange,
            value: formik.values.father.middle_name
              ? formik.values.father.middle_name
              : "",
            error: formik.errors.father?.middle_name,
            touched: formik.touched.father?.middle_name,
            placeholder: "Middle Name",
            className: "w-1/3",
          })}

          {generateInput({
            disabled: !isEditOn,
            required: true,
            id: "father.last_name",
            label: "Last name :",
            onChange: formik.handleChange,
            value: formik.values.father.last_name,
            error: formik.errors.father?.last_name,
            touched: formik.touched.father?.last_name,
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
            id: "father.contact_number",
            label: "Mobile Number :",
            onChange: formik.handleChange,
            value: formik.values.father?.contact_number
              ? formik.values.father.contact_number
              : "",
            error: formik.errors.father?.contact_number,
            touched: formik.touched.father?.contact_number,
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
          id: "mother.first_name",
          label: "First name :",
          onChange: formik.handleChange,
          value: formik.values.mother.first_name,
          error: formik.errors.mother?.first_name,
          touched: formik.touched.mother?.first_name,
          placeholder: "First Name",
          className: "w-1/3",
        })}

        {generateInput({
          disabled: !isEditOn,
          id: "mother.middle_name",
          label: "Middle name :",
          onChange: formik.handleChange,
          value: formik.values.mother.middle_name
            ? formik.values.mother.middle_name
            : "",
          error: formik.errors.mother?.middle_name,
          touched: formik.touched.mother?.middle_name,
          placeholder: "Middle Name",
          className: "w-1/3",
        })}

        {generateInput({
          disabled: !isEditOn,
          required: true,
          id: "mother.last_name",
          label: "Last name :",
          onChange: formik.handleChange,
          value: formik.values.mother.last_name,
          error: formik.errors.mother?.last_name,
          touched: formik.touched.mother?.last_name,
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
          id: "mother.contact_number",
          label: "Mobile Number :",
          onChange: formik.handleChange,
          value: formik.values.mother.contact_number
            ? formik.values.mother.contact_number
            : "",
          error: formik.errors.mother?.contact_number,
          touched: formik.touched.mother?.contact_number,
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
          id: "guardian.first_name",
          label: "First name :",
          onChange: formik.handleChange,
          value: formik.values.guardian.first_name,
          error: formik.errors.guardian?.first_name,
          touched: formik.touched.guardian?.first_name,
          placeholder: "First Name",
          className: "w-1/3",
        })}

        {generateInput({
          disabled: !isEditOn,
          id: "guardian.middle_name",
          label: "Middle name :",
          onChange: formik.handleChange,
          value: formik.values.guardian.middle_name
            ? formik.values.guardian.middle_name
            : "",
          error: formik.errors.guardian?.middle_name,
          touched: formik.touched.guardian?.middle_name,
          placeholder: "Middle Name",
          className: "w-1/3",
        })}

        {generateInput({
          disabled: !isEditOn,
          required: true,
          id: "guardian.last_name",
          label: "Last name :",
          onChange: formik.handleChange,
          value: formik.values.guardian.last_name,
          error: formik.errors.guardian?.last_name,
          touched: formik.touched.guardian?.last_name,
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
          id: "guardian.contact_number",
          label: "Mobile Number :",
          onChange: formik.handleChange,
          value: formik.values.guardian.contact_number
            ? formik.values.guardian.contact_number
            : "",
          error: formik.errors.guardian?.contact_number,
          touched: formik.touched.guardian?.contact_number,
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
