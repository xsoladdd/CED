import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import React from "react";
import { FiEdit, FiSave, FiX } from "react-icons/fi";
import Card, { CardHeader } from "../../../../../../../../components/Card";
import LRNInput from "../../../../../../../../components/LRNInput/LRNInput";
import WarningModal from "../../../../../../../../components/WarningModal";
import {
  Student,
  UpdateStudentBasicInfoDocument,
} from "../../../../../../../../graphQL/generated/graphql";
import useDashboardRouter from "../../../../../../../../hooks/useDashboardRouter";
import useToggle from "../../../../../../../../hooks/useToggle";
import useStore from "../../../../../../../../store/useStore";
import { generateInput } from "../helper";
import { basicInfoSchema } from "./helper";

const BasicInfoCard: React.FC = ({}) => {
  const { status: isEditOn, toggle } = useToggle(false);
  const { status: modalStatus, toggle: toggleModal } = useToggle(false);

  const [updateStudentBasicInfo] = useMutation(UpdateStudentBasicInfoDocument);

  const { pushRoute } = useDashboardRouter();
  const {
    student: { selectedStudent, checkStudentEditStatus },
  } = useStore();

  const formik = useFormik<Student>({
    initialValues: {
      ...selectedStudent,
    },
    validationSchema: basicInfoSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      // qwer Fix Submitting with API
      // setSelectedBasicInfo(values);
      updateStudentBasicInfo({
        variables: {
          id: selectedStudent.id as string,
          input: {
            birthday: values.birthday ? values.birthday : "",
            contact_number: values.contact_number ? values.contact_number : "",
            email: values.email ? values.email : "",
            first_name: values.first_name,
            LRN: values.LRN,
            last_name: values.last_name,
            middle_name: values.middle_name ? values.middle_name : "",
          },
        },
        onCompleted: () => {
          pushRoute(
            {
              title: "students",
              route: "students",
            },
            true
          );
          toggle();
        },
      });
    },
  });
  const header = (
    <div className="w-full flex justify-between ">
      <CardHeader
        title={`Basic Information`}
        subTitle={isEditOn ? "Edit" : ""}
      />
      {checkStudentEditStatus && (
        <>
          {isEditOn ? (
            <div className="flex gap-2">
              <button className="btn btn-xs btn-success" type="submit">
                <FiSave />
              </button>
              <button
                className="btn btn-xs btn-error"
                type="button"
                onClick={() => toggleModal()}
              >
                <FiX />
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <button
                className="btn btn-xs btn-info"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  toggle();
                }}
              >
                <FiEdit />
              </button>
            </div>
          )}
        </>
      )}
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
        <Card className="w-full overflow-visible" header={header}>
          <div className="flex gap-3">
            <LRNInput
              LRN={formik.values.LRN}
              formikHandleChange={formik.handleChange}
              id="LRN"
              setFieldError={formik.setFieldError}
              error={formik.errors.LRN}
              currentLRN={selectedStudent.LRN}
              disabled={!isEditOn}
            />
          </div>
          <div className="flex gap-3">
            {generateInput({
              disabled: !isEditOn,
              id: "first_name",
              label: "First name :",
              onChange: formik.handleChange,
              value: formik.values.first_name,
              error: formik.errors.first_name,
              touched: formik.touched.first_name,
              placeholder: "First name",
              required: true,
              className: "w-1/3",
            })}
            {generateInput({
              disabled: !isEditOn,
              id: "middle_name",
              label: "Middle name :",
              onChange: formik.handleChange,
              value: formik.values.middle_name ? formik.values.middle_name : "",
              error: formik.errors.middle_name,
              touched: formik.touched.middle_name,
              placeholder: "Middle name",
              className: "w-1/3",
            })}
            {generateInput({
              disabled: !isEditOn,
              required: true,
              id: "last_name",
              label: "Last name :",
              onChange: formik.handleChange,
              value: formik.values.last_name,
              error: formik.errors.last_name,
              touched: formik.touched.last_name,
              placeholder: "Middle name",
              className: "w-1/3",
            })}
          </div>
          <div className="flex gap-3">
            {generateInput({
              disabled: !isEditOn,
              required: true,
              id: "gender",
              label: "Gender :",
              onChange: formik.handleChange,
              value: formik.values.gender,
              error: formik.errors.gender,
              touched: formik.touched.gender,
              placeholder: "Gender",
              inputType: "select",
              selectValues: [
                { text: "Male", value: "M" },
                { text: "Female", value: "F" },
              ],
              className: "w-1/3",
            })}
            {generateInput({
              disabled: !isEditOn,
              required: true,
              id: " birthday",
              label: "Birthday :",
              inputType: "date",
              onDateChange: (date) => {
                if (date instanceof Date) {
                  formik.setFieldValue("birthday", date);
                }
              },
              value: formik.values.birthday
                ? formik.values.birthday
                : "2000-01-01",
              error: formik.errors.birthday,
              touched: !!formik.touched.birthday,
              placeholder: "Birthday",
              className: "w-1/3",
            })}
          </div>
          <div className="flex gap-3 ">
            {generateInput({
              type: "email",
              disabled: !isEditOn,
              required: true,
              id: "email",
              label: "Email :",
              onChange: formik.handleChange,
              value: formik.values.email ? formik.values.email : "",
              error: formik.errors.email,
              touched: formik.touched.email,
              placeholder: "Email",
              className: "w-1/3 ",
            })}
            {generateInput({
              disabled: !isEditOn,
              id: "contact_number",
              required: true,
              label: "Mobile Number :",
              onChange: formik.handleChange,
              value: formik.values.contact_number
                ? formik.values.contact_number
                : "",
              error: formik.errors.contact_number,
              touched: formik.touched.contact_number,
              placeholder: "Mobile Number",
              className: "w-1/3 ",
            })}
            <h1 className="w-1/3"></h1>
          </div>
        </Card>
      </form>
    </>
  );
};
export default BasicInfoCard;
