import { useFormik } from "formik";
import React from "react";
import Card, {
  CardFooter,
  CardHeader,
} from "../../../../../../components/Card";
import AcademicBackgroundForm from "./Components/AcademicBackgroundForm";
import AddressInfoForm from "./Components/AddressInfoForm";
import BasicInfoForm from "./Components/BasicInfoForm";
import { addingFormSchema, defaultValue } from "./Components/helper";
import ParentGuardianForm from "./Components/ParentGuardianForm";
import { IStudentAddingForm } from "./Components/types";

const AddStudent: React.FC = ({}) => {
  const formik = useFormik<IStudentAddingForm>({
    initialValues: { ...defaultValue },
    validationSchema: addingFormSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      // qwer Fix Submitting with API
      console.log(values);
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
          <button className="btn btn-sm btn-link" type={"reset"}>
            Reset
          </button>
          <button className="btn btn-sm btn-success" type={"submit"}>
            Submit
          </button>
        </div>
      }
    />
  );
  console.log(addingFormSchema);

  return (
    <>
      <form className="w-full " onSubmit={formik.handleSubmit}>
        <Card className="w-full  " header={cardHeader} footer={cardFooter}>
          <div className="flex flex-col gap-5 bg-red-300">
            <BasicInfoForm formik={formik} />
            <AddressInfoForm formik={formik} />
            <ParentGuardianForm formik={formik} />
            <AcademicBackgroundForm formik={formik} />
          </div>
        </Card>
      </form>
    </>
  );
};
export default AddStudent;
