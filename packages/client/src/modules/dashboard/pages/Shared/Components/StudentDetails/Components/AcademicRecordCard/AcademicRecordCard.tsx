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
import { generateInput } from "../helper";
import { academicRecordInfoSchema } from "./helper";

const AcademicRecordCard: React.FC = ({}) => {
  const { status: isEditOn, toggle } = useToggle(false);
  const { status: modalStatus, toggle: toggleModal } = useToggle(false);
  const { status: saveModalStatus, toggle: saveModalStatusToggle } =
    useToggle(false);
  const {
    student: {
      selectedStudent: { academicInfo },
      setSelectedAcademicRecordInfo,
    },
  } = useStore();
  const formik = useFormik({
    initialValues: academicInfo.map(
      ({ academicLevel, school, schoolYear }) => ({
        academicLevel,
        school,
        schoolYear,
        isActive: true,
      })
    ),
    validationSchema: academicRecordInfoSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      // qwer Fix Submitting with API
      const trimmedArray = values.filter(({ isActive }) => isActive);
      setSelectedAcademicRecordInfo(trimmedArray);
      formik.setValues(trimmedArray);
      saveModalStatusToggle();
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
          <button
            className="btn btn-xs btn-success"
            type="button"
            onClick={() => saveModalStatusToggle()}
          >
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
                ...academicInfo.map((itmArr) => ({
                  ...itmArr,
                  isActive: true,
                })),
                {
                  academicLevel: "Junior High",
                  school: "",
                  schoolYear: "",
                  isActive: false,
                },
                {
                  academicLevel: "Junior High",
                  school: "",
                  schoolYear: "",
                  isActive: false,
                },
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

  const record = (idx: number) => {
    return (
      <div
        className={joinClass(
          `flex gap-3`
          // formik.values[idx]?.isActive ? "" : "bg-gray-200"
        )}
        key={idx}
      >
        {isEditOn && (
          <>
            <div className="flex place-items-end pb-1">
              <div className="form-control">
                <label className="label cursor-pointer gap-2">
                  <input
                    type="checkbox"
                    className="checkbox  checkbox-sm checkbox-primary"
                    id={`[${idx}]isActive`}
                    checked={formik.values[idx]?.isActive}
                    onChange={formik.handleChange}
                  />
                  <span className="label-text">Active</span>
                </label>
              </div>
            </div>
          </>
        )}
        {generateInput({
          disabled: !isEditOn || !formik.values[idx]?.isActive,
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
          disabled: !isEditOn || !formik.values[idx]?.isActive,
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
          disabled: !isEditOn || !formik.values[idx]?.isActive,
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
      </div>
    );
  };
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

        <WarningModal
          color="green"
          status={saveModalStatus}
          handleClose={() => saveModalStatusToggle()}
          handleProceed={() => {
            formik.submitForm();
          }}
        >
          <div className="">
            {formik.values.filter(
              ({ isActive, school }) => !isActive && !!school
            ).length === 0 ? (
              <p>Are you sure that you want to save changes</p>
            ) : (
              <>
                <p className="text-sm pb-2">
                  Are you sure that you want to save changes including deletion
                  of the following data:{" "}
                </p>
                <ol className="text-sm italic pl-6 list-decimal">
                  {formik.values
                    .filter(({ isActive, school }) => !isActive && !!school)
                    .map(({ school, academicLevel }, idx) => (
                      <li key={idx}>{`(${academicLevel})${school}`}</li>
                    ))}
                </ol>
              </>
            )}
          </div>
        </WarningModal>
        <Card className="w-full" header={header}>
          {isEditOn && (
            <span className="italic text-xs ">
              <RequiredIndicator /> Note: All data that is counted as not-active
              will be deleted in our record.{" "}
            </span>
          )}

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
