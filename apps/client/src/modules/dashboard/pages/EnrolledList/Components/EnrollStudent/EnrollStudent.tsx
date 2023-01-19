import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import React, { useState } from "react";
import Card, {
  CardFooter,
  CardHeader,
} from "../../../../../../components/Card";
import WarningModal from "../../../../../../components/WarningModal";
import { EnrollStudentDocument } from "../../../../../../graphQL/generated/graphql";
import useDashboardRouter from "../../../../../../hooks/useDashboardRouter";
import useToggle from "../../../../../../hooks/useToggle";
import EnrollmentRecord from "./Components/EnrollmentRecord";
import StepperLabel from "./Components/StepperLabel";
import StudentSearch from "./Components/StudentSearch";
import { IEnrollmentForm } from "./types";

const EnrollStudent: React.FC = ({}) => {
  const [serverError, setServerError] = useState("");
  const [formIndex, setFormIndex] = useState(0);
  const { status: confirmModalStatus, toggle: confirmModalToggle } =
    useToggle(false);
  const { pushRoute } = useDashboardRouter();
  const [enrollStudent] = useMutation(EnrollStudentDocument);

  const formik = useFormik<IEnrollmentForm>({
    initialValues: {
      student_id: "",
      student: undefined,
      section: "",
      year_level: "",
    },
    onSubmit: (values) => {
      // Validate grade level
      // Select enrollment record with same year level
      const selectEnrollmentRecord = values.student?.enrollment_records?.filter(
        (props) => props?.grade_level_id === values.year_level
      );
      // Check if already has enrollment record
      if (selectEnrollmentRecord?.length !== 0) {
        return setServerError(
          "There seems to be a duplicate enrollment record with the same year level"
        );
      } else {
        // Submit Event
        if (!values.section || !values.student_id || !values.year_level) {
          return setServerError("Please fillup all forms");
        }
        enrollStudent({
          variables: {
            input: {
              id: values.student_id,
              section: values.section,
              year_level: values.year_level,
            },
          },
          onCompleted: () => {
            pushRoute({
              title: "Enrolled List",
              route: "enrolledList",
            });
          },
        });
      }
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <WarningModal
          status={confirmModalStatus}
          handleClose={() => confirmModalToggle()}
          handleProceed={() => {
            confirmModalToggle();
            formik.submitForm();
          }}
          color="green"
        >
          {`Are you sure that you want to save ?`}
        </WarningModal>
        <Card
          className="w-full"
          header={<CardHeader title="Enroll new student" />}
          footer={
            <CardFooter
              right={
                <div className="flex gap-5">
                  {serverError && (
                    <>
                      <p className="text-red-500 text-sm flex place-items-center">
                        {serverError}
                      </p>
                    </>
                  )}
                  {/* Hide submit button in student search area */}
                  {formIndex !== 0 && (
                    <div className="flex gap-2">
                      <button
                        className="btn btn-sm btn-ghost"
                        type="button"
                        onClick={() => setFormIndex(formIndex - 1)}
                      >
                        Back
                      </button>
                      <button
                        className={`btn btn-sm btn-success`}
                        type="button"
                        onClick={() => confirmModalToggle()}
                      >
                        Submit
                      </button>
                    </div>
                  )}
                </div>
              }
            />
          }
        >
          <div className="min-h-[400px]">
            <StepperLabel formIndex={formIndex} changeIndex={setFormIndex} />
            {/* Student Search */}
            {formIndex === 0 && (
              <StudentSearch
                formik={formik}
                changeIndex={(idx) => setFormIndex(idx)}
              />
            )}
            {formIndex === 1 && <EnrollmentRecord formik={formik} />}
          </div>
        </Card>
      </form>
    </>
  );
};
export default EnrollStudent;
