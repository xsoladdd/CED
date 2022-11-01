import { useFormik } from "formik";
import React, { useState } from "react";
import Card, {
  CardFooter,
  CardHeader,
} from "../../../../../../components/Card";
import { IselectedStudentState } from "../../../../../../store/useStore/slices/student/types";
import { joinClass } from "../../../../../../utils/joinClass";
import AcademicBackgroundForm from "./Components/AcademicBackgroundForm";
import AddressInfoForm from "./Components/AddressInfoForm";
import BasicInfoForm from "./Components/BasicInfoForm";
import { defaultValue, schemaArray } from "./Components/helper";
import ParentGuardianForm from "./Components/ParentGuardianForm";

const AddStudentStepper: React.FC = ({}) => {
  const [formIndex, setFormIndex] = useState(0);
  const maxPageIndex = schemaArray.length - 1;
  const formik = useFormik<IselectedStudentState>({
    initialValues: { ...defaultValue },
    validationSchema: schemaArray[formIndex],
    onSubmit: (values) => {
      // qwer Fix Submitting with API
      if (formIndex !== maxPageIndex) {
        setFormIndex(formIndex + 1);
      } else {
        console.log(values);
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
        <div className="flex gap-2">
          {formIndex !== 0 && (
            <button
              className="btn btn-sm btn-link"
              type="button"
              onClick={() => {
                setFormIndex(formIndex - 1);
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
    <AcademicBackgroundForm formik={formik} key={3} />,
  ];

  const stepper = (
    <div className="w-full flex justify-center py-8">
      <ul className="steps">
        <li className={joinClass("step", formIndex >= 0 ? "step-primary" : "")}>
          Basic Details
        </li>
        <li className={joinClass("step", formIndex >= 1 ? "step-primary" : "")}>
          Address
        </li>
        <li className={joinClass("step", formIndex >= 2 ? "step-primary" : "")}>
          Parent/Guardian{" "}
        </li>
        <li className={joinClass("step", formIndex >= 3 ? "step-primary" : "")}>
          Academic Background
        </li>
        <li className={joinClass("step", formIndex >= 4 ? "step-primary" : "")}>
          Finalize
        </li>
      </ul>
    </div>
  );
  return (
    <>
      <form className="w-full" onSubmit={formik.handleSubmit}>
        <Card
          className="w-full overflow-visible"
          header={cardHeader}
          footer={cardFooter}
        >
          {stepper}
          <div className="flex flex-col gap-5">{formArray[formIndex]}</div>
        </Card>
      </form>
    </>
  );
};
export default AddStudentStepper;
