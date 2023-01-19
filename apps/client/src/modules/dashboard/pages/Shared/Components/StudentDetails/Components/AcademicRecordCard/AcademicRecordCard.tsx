import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import React from "react";
import { FiEdit, FiSave, FiX } from "react-icons/fi";
import Card, { CardHeader } from "../../../../../../../../components/Card";
import RequiredIndicator from "../../../../../../../../components/Required/RequiredIndicator";
import Text from "../../../../../../../../components/Text";
import WarningModal from "../../../../../../../../components/WarningModal";
import { UpdateStudentAcademicRecordsDocument } from "../../../../../../../../graphQL/generated/graphql";
import useToggle from "../../../../../../../../hooks/useToggle";
import useStore from "../../../../../../../../store/useStore";
import { joinClass } from "../../../../../../../../utils/joinClass";
import { cleanString } from "../GuardianCard/helper";
import { generateInput } from "../helper";
import { academicRecordInfoSchema } from "./helper";

const AcademicRecordCard: React.FC = ({}) => {
  const { status: isEditOn, toggle } = useToggle(false);
  const { status: modalStatus, toggle: toggleModal } = useToggle(false);
  const { status: saveModalStatus, toggle: saveModalStatusToggle } =
    useToggle(false);
  const {
    student: {
      selectedStudent: { school_records, id },
      checkStudentEditStatus,
    },
  } = useStore();

  const [updateStudentAcademicRecords] = useMutation(
    UpdateStudentAcademicRecordsDocument
  );
  interface valueStructure {
    val: Array<{
      id?: string | null;
      sy_graduated?: string | null;
      school_name?: string | null;
      is_active: boolean;
      type?: string;
    }>;
  }

  const formik = useFormik<valueStructure>({
    initialValues: {
      val: [1, 2, 3, 4, 5].map((_, idx) => {
        return {
          id: school_records && school_records[idx]?.id,
          sy_graduated: school_records && school_records[idx]?.sy_graduated,
          school_name: school_records && school_records[idx]?.school_name,
          type:
            school_records && school_records[idx]?.type
              ? school_records[idx]?.type
              : "Pre-Elementary",
          is_active: !!(school_records && school_records[idx]?.sy_graduated),
        };
      }),
    },
    validationSchema: academicRecordInfoSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      // qwer Fix Submitting with API
      // const trimmedArray = values.filter(({ isActive }) => isActive);
      // setSelectedAcademicRecordInfo(trimmedArray);
      // formik.setValues(trimmedArray);
      // saveModalStatusToggle();
      const trimmedValues = values.val.filter(
        ({ school_name, sy_graduated }) => !!school_name && !!sy_graduated
      );

      updateStudentAcademicRecords({
        variables: {
          id: id as string,
          input: trimmedValues.map(
            ({ is_active, school_name, sy_graduated, type, id: valID }) => ({
              is_active,
              school_name: school_name as string,
              sy_graduated: sy_graduated as string,
              type: type as string,
              id: valID ? valID : undefined,
            })
          ),
        },
        onCompleted: () => {
          saveModalStatusToggle();
          toggle();
        },
      });
    },
  });
  const header = (
    <div className="w-full flex justify-between ">
      <CardHeader title={`Academic Record`} subTitle={isEditOn ? "Edit" : ""} />
      {checkStudentEditStatus && (
        <>
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
                    id={`val.[${idx}]is_active`}
                    checked={formik.values.val[idx]?.is_active}
                    onChange={formik.handleChange}
                  />
                  <span className="label-text">Active</span>
                </label>
              </div>
            </div>
          </>
        )}
        {generateInput({
          disabled: !isEditOn || !formik.values.val[idx]?.is_active,
          required: true,
          id: `val.[${idx}]school_name`,
          label: "School",
          onChange: formik.handleChange,
          value: cleanString(formik.values.val[idx]?.school_name),

          error:
            formik.errors.val &&
            formik.errors.val.length !== 0 &&
            (formik.errors.val[idx] as { school_name: string }).school_name,
          touched:
            formik.touched.val &&
            formik.touched.val.length !== 0 &&
            (formik.touched.val[idx] as { school_name: boolean }).school_name,
          placeholder: "School",
          className: "w-3/5",
        })}
        {generateInput({
          disabled: !isEditOn || !formik.values.val[idx]?.is_active,
          required: true,
          id: `val.[${idx}]sy_graduated`,
          label: "School Year",
          onChange: formik.handleChange,
          value: cleanString(formik.values.val[idx]?.sy_graduated),
          error:
            formik.errors.val &&
            formik.errors.val.length !== 0 &&
            (formik.errors.val[idx] as { sy_graduated: string }).sy_graduated,
          touched:
            formik.touched.val &&
            formik.touched.val.length !== 0 &&
            (formik.touched.val[idx] as { sy_graduated: boolean }).sy_graduated,
          placeholder: "ex: 2014-2015",
          className: "w-1/5",
        })}
        {generateInput({
          disabled: !isEditOn || !formik.values.val[idx]?.is_active,
          required: true,
          id: `[${idx}]academicLevel`,
          label: "Academic Level :",
          onChange: formik.handleChange,
          value: formik.values.val[idx]?.type,
          error:
            formik.errors.val &&
            formik.errors.val.length !== 0 &&
            (formik.errors.val[idx] as { type: string }).type,
          touched:
            formik.touched.val &&
            formik.touched.val.length !== 0 &&
            (formik.touched.val[idx] as { type: boolean }).type,
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
      {[0, 1, 2, 3, 4].map((_, idx) => record(idx))}
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
            {/* {formik.values.filter(
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
            )} */}
          </div>
        </WarningModal>
        <Card className="w-full" header={header}>
          {isEditOn && (
            <span className="italic text-xs ">
              <RequiredIndicator /> Note: All data that is counted as not-active
              will be deleted in our record.{" "}
            </span>
          )}

          {formik.values.val.length === 0 ? (
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
