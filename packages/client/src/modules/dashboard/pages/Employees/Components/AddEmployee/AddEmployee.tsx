import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import React from "react";
import Card, {
  CardFooter,
  CardHeader,
} from "../../../../../../components/Card";
import {
  AddEmployeeDocument,
  EmployeeInput,
  GetAuditTrailsDocument,
  GetEmployeesDocument,
} from "../../../../../../graphQL/generated/graphql";
import useDashboardRouter from "../../../../../../hooks/useDashboardRouter";
import useStore from "../../../../../../store/useStore";
import { joinClass } from "../../../../../../utils/joinClass";
import { generateInput } from "../../../Shared/Components/StudentDetails/Components/helper";
import { addEmployeeFormSchema } from "./helper";

const AddEmployee: React.FC = ({}) => {
  const {
    globalVars: { roles },
  } = useStore();

  const { pushRoute } = useDashboardRouter();

  const [addEmployee, { loading }] = useMutation(AddEmployeeDocument, {
    refetchQueries: [
      {
        query: GetEmployeesDocument,
        notifyOnNetworkStatusChange: true,
        variables: {
          limit: 10,
          offset: 0,
          search: "",
          filter: {},
        },
      },
      {
        query: GetAuditTrailsDocument,
        notifyOnNetworkStatusChange: true,
        variables: {
          limit: 10,
          offset: 0,
          search: "",
          filter: {
            type: "",
          },
        },
      },
    ],
    awaitRefetchQueries: true,
    onCompleted: () => {
      pushRoute({ title: "employees", route: "employees" }, true);
    },
  });

  const formik = useFormik<EmployeeInput>({
    initialValues: {
      employee_id: "",
      role: "RT",
      password: "",
      profile: {
        first_name: "",
        last_name: "",
      },
    },
    validationSchema: addEmployeeFormSchema,
    onSubmit: async (values) => {
      await addEmployee({
        variables: {
          input: {
            employee: values,
          },
        },
      });
    },
  });

  const cardFooter = (
    <CardFooter
      right={
        <div className="flex gap-2">
          <button
            className={joinClass(`btn btn-sm`, "btn-success")}
            type="submit"
            disabled={loading}
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
            id: "profile.first_name",
            label: "First name :",
            onChange: formik.handleChange,
            value: formik.values.profile?.first_name,
            error:
              typeof formik.errors.profile === "object" &&
              (formik.errors.profile as { first_name: string }).first_name,
            touched:
              typeof formik.touched.profile === "object" &&
              (formik.touched.profile as { first_name: boolean }).first_name,
            placeholder: "First name",
            required: true,
            className: "w-1/3",
          })}
          {generateInput({
            id: "profile.middle_name",
            label: "Middle name :",
            onChange: formik.handleChange,
            value: formik.values.profile?.middle_name
              ? formik.values.profile?.middle_name
              : "",
            error:
              typeof formik.errors.profile === "object" &&
              (formik.errors.profile as { middle_name: string }).middle_name,
            touched:
              typeof formik.touched.profile === "object" &&
              (formik.touched.profile as { middle_name: boolean }).middle_name,
            placeholder: "Middle name",
            className: "w-1/3",
          })}
          {generateInput({
            required: true,
            id: "profile.last_name",
            label: "Last name :",
            onChange: formik.handleChange,
            value: formik.values.profile?.last_name,
            error:
              typeof formik.errors.profile === "object" &&
              (formik.errors.profile as { last_name: string }).last_name,
            touched:
              typeof formik.touched.profile === "object" &&
              (formik.touched.profile as { last_name: boolean }).last_name,
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
            id: "employee_id",
            label: "Employee ID :",
            onChange: formik.handleChange,
            value: formik.values.employee_id,
            error: formik.errors.employee_id,
            touched: formik.touched.employee_id,
            placeholder: "Employee ID",
            className: "w-1/3",
          })}
          {generateInput({
            required: true,
            id: "password",
            label: "Partial Password :",
            onChange: formik.handleChange,
            value: formik.values.password,
            error: formik.errors.password,
            touched: formik.touched.password,
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
