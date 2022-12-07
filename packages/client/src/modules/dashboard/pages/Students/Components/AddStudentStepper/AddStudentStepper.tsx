import { useMutation } from "@apollo/client";
import { format } from "date-fns";
import { useFormik } from "formik";
import React, { useState } from "react";
import Card, {
  CardFooter,
  CardHeader,
} from "../../../../../../components/Card";
import {
  AddStudentDocument,
  GetStudentsDocument,
} from "../../../../../../graphQL/generated/graphql";
import useDashboardRouter from "../../../../../../hooks/useDashboardRouter";
import { joinClass } from "../../../../../../utils/joinClass";
import AcademicBackgroundForm from "./Components/AcademicBackgroundForm";
import AddressInfoForm from "./Components/AddressInfoForm";
import BasicInfoForm from "./Components/BasicInfoForm";
import { defaultValue, schemaArray } from "./Components/helper";
import ParentGuardianForm from "./Components/ParentGuardianForm";
import RequirementsForm from "./Components/RequirementsForm";
import ReviewForms from "./Components/ReviewForms";
import StepperLabel from "./Components/StepperLabel";

const AddStudentStepper: React.FC = ({}) => {
  const [formIndex, setFormIndex] = useState(0);
  const [executeAddStudent] = useMutation(AddStudentDocument);
  const [serverError, setServerError] = useState("");
  const { pushRoute } = useDashboardRouter();

  const maxPageIndex = schemaArray.length - 1;
  const formik = useFormik({
    initialValues: {
      ...defaultValue,
    },
    validationSchema: schemaArray[formIndex],
    onSubmit: (values, { setSubmitting }) => {
      setServerError("");
      if (formIndex !== maxPageIndex) {
        setFormIndex(formIndex + 1);
      } else {
        setSubmitting(true);
        const {
          academicInfo,
          addressInfo,
          basicInfo,
          guardianInfo,
          requirementInfo,
        } = values;
        const birthday = format(new Date(basicInfo.birthday), "yyyy-MM-dd");
        executeAddStudent({
          variables: {
            input: {
              ...basicInfo,
              birthday,
              address: {
                ...addressInfo,
              },
              requirements: {
                ...requirementInfo,
              },
              parent_guardians: [
                guardianInfo.father
                  ? {
                      email: guardianInfo.father.email,
                      first_name: guardianInfo.father.first_name,
                      middle_name: guardianInfo.father.middle_name,
                      last_name: guardianInfo.father.last_name,
                      contact_number: guardianInfo.father.contact_number,
                      type: "F",
                    }
                  : null,
                guardianInfo.mother
                  ? {
                      email: guardianInfo.mother.email,
                      first_name: guardianInfo.mother.first_name,
                      middle_name: guardianInfo.mother.middle_name,
                      last_name: guardianInfo.mother.last_name,
                      contact_number: guardianInfo.mother.contact_number,
                      type: "F",
                    }
                  : null,
                guardianInfo.guardian
                  ? {
                      email: guardianInfo.guardian.email,
                      first_name: guardianInfo.guardian.first_name,
                      middle_name: guardianInfo.guardian.middle_name,
                      last_name: guardianInfo.guardian.last_name,
                      contact_number: guardianInfo.guardian.contact_number,
                      type: "F",
                    }
                  : null,
              ],
              school_records: academicInfo.map(
                ({ academicLevel, school, schoolYear }) => ({
                  school_name: school,
                  sy_graduated: schoolYear,
                  type: academicLevel,
                  is_active: true,
                })
              ),
            },
          },
          onError: (error) => {
            setSubmitting(false);
            setServerError(error.message);
          },
          onCompleted: () => {
            setSubmitting(false);
            pushRoute({ title: "students", route: "students" }, true);
          },
          awaitRefetchQueries: true,
          refetchQueries: [
            {
              query: GetStudentsDocument,
              variables: {
                limit: 10,
                offset: 0,
                filter: {},
              },
            },
          ],
        });
      }
    },
  });

  const cardHeader = (
    <CardHeader
      title="new student Form"
      subTitle="Fill up the form to continue"
    />
  );

  const cardFooter = (
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

          {formIndex !== 0 && (
            <button
              className="btn btn-sm btn-link"
              type="button"
              onClick={() => {
                setFormIndex(formIndex - 1);
                setServerError("");
              }}
            >
              back
            </button>
          )}
          <button
            className={joinClass(
              `btn btn-sm`,
              formIndex !== maxPageIndex ? "btn-info" : "btn-success"
            )}
            type="submit"
          >
            {formIndex !== maxPageIndex ? "Next" : "Submit"}
          </button>
        </div>
      }
    />
  );

  const formArray = [
    <BasicInfoForm formik={formik} key={0} />,
    <AddressInfoForm formik={formik} key={1} />,
    <ParentGuardianForm formik={formik} key={2} />,
    <RequirementsForm formik={formik} key={3} />,
    <AcademicBackgroundForm formik={formik} key={4} />,
    <ReviewForms formik={formik} key={5} />,
  ];

  return (
    <>
      <form
        className="w-full overflow-visible min-h-[1000px]"
        onSubmit={formik.handleSubmit}
      >
        <Card
          className="w-full overflow-visible"
          header={cardHeader}
          footer={cardFooter}
        >
          <StepperLabel formIndex={formIndex} changeIndex={setFormIndex} />
          <div className="flex flex-col gap-5">{formArray[formIndex]}</div>
        </Card>
      </form>
    </>
  );
};
export default AddStudentStepper;
