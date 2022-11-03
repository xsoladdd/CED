import { useFormik } from "formik";
import React from "react";
import Card, {
  CardFooter,
  CardHeader,
} from "../../../../../../components/Card";
import useStore from "../../../../../../store/useStore";
import { IemployeeData } from "../../../../../../store/useStore/slices/emplyees/types";
import { joinClass } from "../../../../../../utils/joinClass";
import { generateInput } from "../../../Shared/Components/StudentDetails/Components/helper";
import { defaultInfo } from "./helper";

const AddEmployee: React.FC = ({}) => {
  const {
    globalVars: { roles },
  } = useStore();
  const formik = useFormik<IemployeeData>({
    initialValues: { ...defaultInfo },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const cardFooter = (
    <CardFooter
      right={
        <div className="flex gap-2">
          <button
            className={joinClass(`btn btn-sm`, "btn-success")}
            type="submit"
          >
            {"Submit"}
          </button>
        </div>
      }
    />
  );

  const form = (
    <>
      <div>
        <div className="flex gap-3">
          {generateInput({
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
            id: "middle_name",
            label: "Middle name :",
            onChange: formik.handleChange,
            value: formik.values.middle_name,
            error: formik.errors.middle_name,
            touched: formik.touched.middle_name,
            placeholder: "Middle name",
            className: "w-1/3",
          })}
          {generateInput({
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
        <div className="flex gap-3   ">
          {generateInput({
            required: true,
            id: "role",
            label: "role :",
            onChange: formik.handleChange,
            value: formik.values.role,
            error: formik.errors.role,
            touched: formik.touched.role,
            inputType: "select",
            selectValues: [
              ...roles
                .filter(({ value }) => value !== "BA")
                .map(({ title, value }) => ({ value, text: title })),
            ],
            className: "w-1/3",
          })}
          {generateInput({
            required: true,
            id: "EID",
            label: "Employee ID :",
            onChange: formik.handleChange,
            value: formik.values.EID,
            error: formik.errors.EID,
            touched: formik.touched.EID,
            placeholder: "Employee ID",
            className: "w-1/3",
          })}
          {generateInput({
            required: true,
            id: "partial_password",
            label: "Partial Password :",
            onChange: formik.handleChange,
            value: formik.values.partial_password,
            error: formik.errors.partial_password,
            touched: formik.touched.partial_password,
            placeholder: "######",
            className: "w-1/3",
          })}
        </div>
      </div>
    </>
  );
  return (
    <>
      <form className="w-full" onSubmit={formik.handleSubmit}>
        <Card
          bordered={false}
          header={
            <CardHeader
              title="Employee Registration Form"
              subTitle="Please fill-up the following field"
            />
          }
          footer={cardFooter}
        >
          {form}
        </Card>
      </form>
    </>
  );
};
export default AddEmployee;
