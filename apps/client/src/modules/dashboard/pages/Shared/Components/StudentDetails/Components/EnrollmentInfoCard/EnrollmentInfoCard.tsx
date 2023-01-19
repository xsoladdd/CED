import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { FiEdit, FiSave, FiX } from "react-icons/fi";
import Card, { CardHeader } from "../../../../../../../../components/Card";
import WarningModal from "../../../../../../../../components/WarningModal";
import {
  EnrolledRecord,
  UpdateStudentEnrollmentInfoDocument,
} from "../../../../../../../../graphQL/generated/graphql";
import useToggle from "../../../../../../../../hooks/useToggle";
import useStore from "../../../../../../../../store/useStore";
import { generateInput } from "../helper";
// import { basicInfoSchema } from "./helper";

const EnrollmentInfoCard: React.FC = ({}) => {
  const { status: isEditOn, toggle } = useToggle(false);
  const { status: modalStatus, toggle: toggleModal } = useToggle(false);

  const {
    student: { selectedStudent, checkStudentEditStatus },
    globalVars: { school_year, year_level },
  } = useStore();

  const [updateStudentEnrollmentInfo] = useMutation(
    UpdateStudentEnrollmentInfoDocument
  );

  const selectEnrollmentRecordArray =
    selectedStudent.enrollment_records?.filter(
      (props) => props?.SY === school_year
    );

  const selectedEnrollmentRecord = (
    selectEnrollmentRecordArray as EnrolledRecord[]
  )[0];

  const [status, setStatus] = useState("");

  useEffect(() => {
    setStatus(
      selectedEnrollmentRecord.status ? selectedEnrollmentRecord.status : "NP"
    );

    return () => {};
  }, [selectedEnrollmentRecord.status]);

  const formik = useFormik({
    initialValues: {
      section: selectedEnrollmentRecord.section_id
        ? selectedEnrollmentRecord.section_id
        : "",
      status,
    },
    // validationSchema: basicInfoSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (selectedEnrollmentRecord.id) {
        updateStudentEnrollmentInfo({
          variables: {
            eid: selectedEnrollmentRecord.id,
            input: {
              section_id: values.section,
              status: values.status,
            },
          },
          onCompleted: () => {
            toggle();
          },
        });
      }
    },
  });

  const sections = year_level.filter(
    ({ value }) => value === selectedEnrollmentRecord.grade_level_id
  )[0].sections;
  const header = (
    <div className="w-full flex justify-between ">
      <CardHeader
        title={`Current Enrollment`}
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
            {generateInput({
              disabled: !isEditOn,
              required: true,
              id: "section",
              label: "Section :",
              onChange: formik.handleChange,
              value: formik.values.section,
              error: formik.errors.section,
              touched: formik.touched.section,
              placeholder: "Section",
              inputType: "select",
              selectValues: sections
                ? sections.map(({ id, title }) => ({
                    text: title,
                    value: id,
                  }))
                : [],
              className: "w-1/3",
            })}
            {generateInput({
              disabled: !isEditOn,
              required: true,
              id: "status",
              label: "Status :",
              onChange: formik.handleChange,
              value: formik.values.status,
              error: formik.errors.status,
              touched: formik.touched.status,
              placeholder: "Status",
              inputType: "select",
              selectValues: [
                { value: "np", text: "Not paid" },
                { value: "pp", text: "Partial paid" },
                { value: "fp", text: "Fully paid" },
                { value: "d", text: "Dropped" },
              ],
              className: "w-1/3",
            })}
          </div>
        </Card>
      </form>
    </>
  );
};
export default EnrollmentInfoCard;
