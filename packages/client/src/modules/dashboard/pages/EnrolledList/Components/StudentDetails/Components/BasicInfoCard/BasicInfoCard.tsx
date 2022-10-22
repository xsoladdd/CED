import { useFormik } from "formik";
import React from "react";
import { FiEdit, FiSave, FiX } from "react-icons/fi";
import Card, { CardHeader } from "../../../../../../../../components/Card";
import RequiredIndicator from "../../../../../../../../components/Required/RequiredIndicator";
import Text from "../../../../../../../../components/Text";
import WarningModal from "../../../../../../../../components/WarningModal";
import useToggle from "../../../../../../../../hooks/useToggle";
import useStore from "../../../../../../../../store/useStore";
import { joinClass } from "../../../../../../../../utils/joinClass";
import { basicInfoSchema } from "./helper";
import { IgenerateInput } from "./type";

const BasicInfoCard: React.FC = ({}) => {
  const { status: isEditOn, toggle } = useToggle(false);
  const { status: modalStatus, toggle: toggleModal } = useToggle(false);

  const {
    student: {
      selectedStudent: { basicInfo },
      setSelectedBasicInfo,
    },
  } = useStore();

  const formik = useFormik({
    initialValues: {
      ...basicInfo,
    },
    validationSchema: basicInfoSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      // qwer Fix Submitting with API
      setSelectedBasicInfo(values);
      toggle();
    },
  });
  const header = (
    <div className="w-full flex justify-between ">
      <CardHeader title={`Basic Info ${isEditOn ? " - Edit" : " "}`} />
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
    </div>
  );

  const generateInput = ({
    disabled,
    id,
    label,
    onChange,
    value,
    placeholer,
    required,
    type,
    inputType = "input",
    error,
    touched,
    selectValues = [],
  }: IgenerateInput) => (
    <>
      <label className="label">
        <span className="label-text ">
          {!disabled && required ? <RequiredIndicator /> : " "}
          {` ${label}`}
        </span>
      </label>
      {inputType === "input" && (
        <input
          type={type}
          placeholder={placeholer}
          className={joinClass(
            `input input-bordered w-full max-w-xs input-sm`,
            error && touched ? `input-error` : ""
          )}
          value={value}
          onChange={onChange}
          id={id}
          name={id}
          disabled={disabled}
        />
      )}
      {inputType === "select" && (
        <select
          className="select select-bordered select-sm max-w-xs"
          value={value}
          onChange={onChange}
          id={id}
          name={id}
          disabled={disabled}
        >
          <option disabled>Pick one</option>
          {selectValues.map(({ text, value: optValue }, idx) => (
            <option value={optValue} key={idx}>
              {text}
            </option>
          ))}
        </select>
      )}
      {error && touched && (
        <Text variant="error" className="pt-2">
          {error}
        </Text>
      )}
    </>
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
          <div className="">
            <div className="flex gap-3">
              <div className="form-control w-1/3 max-w-xs">
                {generateInput({
                  disabled: !isEditOn,
                  id: "firstName",
                  label: "First name :",
                  onChange: formik.handleChange,
                  value: formik.values.firstName,
                  error: formik.errors.firstName,
                  touched: formik.touched.firstName,
                  placeholer: "First name",
                  required: true,
                })}
              </div>
              <div className="form-control w-1/3 max-w-xs">
                {generateInput({
                  disabled: !isEditOn,
                  id: "middleName",
                  label: "Middle name :",
                  onChange: formik.handleChange,
                  value: formik.values.middleName,
                  error: formik.errors.middleName,
                  touched: formik.touched.middleName,
                  placeholer: "Middle name",
                })}
              </div>
              <div className="form-control w-1/3 max-w-xs">
                {generateInput({
                  disabled: !isEditOn,
                  required: true,
                  id: "lastName",
                  label: "Last name :",
                  onChange: formik.handleChange,
                  value: formik.values.lastName,
                  error: formik.errors.lastName,
                  touched: formik.touched.lastName,
                  placeholer: "Middle name",
                })}
              </div>
            </div>
            <div className="flex gap-3">
              <div className="form-control w-1/3 max-w-xs">
                {generateInput({
                  disabled: !isEditOn,
                  required: true,
                  id: "LRN",
                  label: "LRN :",
                  onChange: formik.handleChange,
                  error: formik.errors.LRN,
                  touched: formik.touched.LRN,
                  value: formik.values.LRN,
                  placeholer: "LRN",
                })}
              </div>
              <div className="form-control w-1/3 max-w-xs">
                {generateInput({
                  disabled: !isEditOn,
                  required: true,
                  id: "gender",
                  label: "Gender :",
                  onChange: formik.handleChange,
                  value: formik.values.gender,
                  error: formik.errors.gender,
                  touched: formik.touched.gender,
                  placeholer: "Gender",
                  inputType: "select",
                  selectValues: [
                    { text: "Male", value: "M" },
                    { text: "Female", value: "F" },
                  ],
                })}
              </div>
              <div className="form-control w-1/3 max-w-xs">
                {generateInput({
                  disabled: !isEditOn,
                  required: true,
                  id: "birthday",
                  label: "Birthday :",
                  onChange: formik.handleChange,
                  value: formik.values.birthday,
                  error: formik.errors.birthday,
                  touched: formik.touched.birthday,
                  placeholer: "Birthday",
                })}
              </div>
            </div>
            <div className="flex gap-3">
              <div className="form-control w-1/2 max-w-xs">
                {generateInput({
                  type: "email",
                  disabled: !isEditOn,
                  required: true,
                  id: "email",
                  label: "Email :",
                  onChange: formik.handleChange,
                  value: formik.values.email,
                  error: formik.errors.email,
                  touched: formik.touched.email,
                  placeholer: "Email",
                })}
              </div>
              <div className="form-control w-1/2 max-w-xs">
                {generateInput({
                  disabled: !isEditOn,
                  id: "mobileNumber",
                  required: true,
                  label: "Mobile Number :",
                  onChange: formik.handleChange,
                  value: formik.values.mobileNumber,
                  error: formik.errors.mobileNumber,
                  touched: formik.touched.mobileNumber,
                  placeholer: "Mobile Number",
                })}
              </div>
            </div>
          </div>
        </Card>
      </form>
    </>
  );
};
export default BasicInfoCard;
