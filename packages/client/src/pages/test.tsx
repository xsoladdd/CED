import { useFormik } from "formik";
import React from "react";
import { FiEdit, FiSave, FiX } from "react-icons/fi";
import Card, { CardHeader } from "../components/Card";
import Text from "../components/Text";
import WarningModal from "../components/WarningModal";
import useToggle from "../hooks/useToggle";
import { academicRecordInfoSchema } from "../modules/dashboard/pages/EnrolledList/Components/StudentDetails/Components/AcademicRecordCard/helper";
import { generateInput } from "../modules/dashboard/pages/EnrolledList/Components/StudentDetails/Components/helper";
import useStore from "../store/useStore";

const AcademicRecordCard: React.FC = ({}) => {
  const { status: isEditOn, toggle } = useToggle(false);
  const { status: modalStatus, toggle: toggleModal } = useToggle(false);
  const {
    student: {
      selectedStudent: { academicInfo },
      setSelectedAcademicRecordInfo,
    },
  } = useStore();
  const formik = useFormik({
    initialValues: academicInfo,
    validationSchema: academicRecordInfoSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values);
      // qwer Fix Submitting with API
      const trimmedArray = values.filter(({ school }) => !!school);
      setSelectedAcademicRecordInfo(trimmedArray);
      toggle();
    },
  });
  const header = (
    <div className="w-full flex justify-between ">
      <CardHeader
        title={`Academic Information ${isEditOn ? " - Edit" : " "}`}
      />
      {isEditOn ? (
        <div className="flex gap-2">
          <button className="btn btn-xs btn-success" type="submit">
            <FiSave />
          </button>
          <button
            className="btn btn-xs btn-error"
            type="button"
            onClick={() => {
              toggleModal();
            }}
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
              formik.setValues([
                ...academicInfo,
                { academicLevel: "Junior High", school: "", schoolYear: "" },
                { academicLevel: "Junior High", school: "", schoolYear: "" },
              ]);
              toggle();
            }}
          >
            <FiEdit />
          </button>
        </div>
      )}
    </div>
  );

  const record = (idx: number) => (
    <div className="flex gap-3" key={idx}>
      {generateInput({
        disabled: !isEditOn,
        required: true,
        id: `[${idx}]school`,
        label: "School",
        onChange: formik.handleChange,
        error: formik.errors[idx]?.school,
        touched: formik.touched[idx]?.school,
        value: formik.values[idx]?.school,
        placeholer: "School",
        className: "w-3/5",
      })}
      {generateInput({
        disabled: !isEditOn,
        required: true,
        id: `[${idx}]schoolYear`,
        label: "School Year",
        onChange: formik.handleChange,
        error: formik.errors[idx]?.schoolYear,
        touched: formik.touched[idx]?.schoolYear,
        value: formik.values[idx]?.schoolYear,
        placeholer: "ex: 2014-2015",
        className: "w-1/5",
      })}
      {generateInput({
        disabled: !isEditOn,
        required: true,
        id: `[${idx}]academicLevel`,
        label: "Academic Level :",
        onChange: formik.handleChange,
        error: formik.errors[idx]?.academicLevel,
        touched: formik.touched[idx]?.academicLevel,
        value: formik.values[idx]?.academicLevel,
        inputType: "select",
        selectValues: [
          { text: "Pre-Elementary", value: "Pre-Elementary" },
          { text: "Elementary", value: "Elementary" },
          { text: "Junior High", value: "Junior High" },
          { text: "Senior High", value: "Senior High" },
        ],
        className: "w-1/5",
      })}
      {/* {isEditOn && (
        <div className="flex place-items-end pb-1">
          <button
            onClick={(e) => {
              e.preventDefault();
              formik.setValues((old) => {
                return removeIndex(old, idx);
              });
            }}
            type="button"
            className="btn btn-xs btn-error"
          >
            <FiX />
          </button>
        </div>
      )} */}
    </div>
  );
  const formItems = (
    <div className="flex gap-2 flex-col">
      {/* {isEditOn
        ? [0, 1, 2, 3, 4].map((idx) => record(idx))
        : formik.values.map((_, idx) => record(idx))} */}
      {formik.values.map((_, idx) => record(idx))}
    </div>
  );

  return (
    <>
      <form className="w-full" onSubmit={formik.handleSubmit}>
        <WarningModal
          status={modalStatus}
          handleClose={() => toggleModal()}
          handleProceed={() => {
            // setManageItems([...academicInfo]);
            formik.resetForm();
            toggle();
            toggleModal();
          }}
        >
          {`Changes won't be save. are you sure you want to cancel?`}
        </WarningModal>
        <Card className="w-full" header={header}>
          {formik.values.length === 0 ? (
            <Text className="italic">No previous record</Text>
          ) : (
            formItems
          )}
        </Card>
      </form>
    </>
  );
};
export default AcademicRecordCard;
