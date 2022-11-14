import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import Text from "../../../components/Text";
import { AuthMutationDocument } from "../../../graphQL/generated/graphql";
import { loginShema } from "../helper";
import ErrorBox from "./ErrorBox";

const LoginForm: React.FC = ({}) => {
  const { push } = useRouter();

  const [executeEmployeeAuthMutation] = useMutation(AuthMutationDocument);

  const formik = useFormik({
    initialValues: {
      EID: "",
      password: "",
    },
    validationSchema: loginShema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      setSubmitting(true);
      await executeEmployeeAuthMutation({
        variables: { input: values },
        onError: (error) => {
          return setErrors({ password: error.message });
        },
        onCompleted: (data) => {
          const { auth } = data;
          if (auth?.token) {
            localStorage.setItem("token", auth?.token);
            push("/dashboard");
          }
        },
      });
      setSubmitting(false);
    },
  });

  const form = (
    <>
      <form
        className="h-full flex flex-col gap-3 py-3"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="employeeId">Emplyee ID</label>
          <input
            name="EID"
            id="EID"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="input input-sm input-bordered"
            autoComplete="off"
            value={formik.values.EID}
            placeholder="Emplyee ID"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password">Password</label>

          <input
            type="password"
            name="password"
            id="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            // isBordered
            value={formik.values.password}
            className="input input-sm input-bordered"
            placeholder="********"
          />
        </div>
        <ErrorBox
          error={
            formik.touched.EID && formik.touched.password
              ? formik.errors.EID || formik.errors.password
              : ""
          }
        />
        <div className="text-center pt-2">
          <button
            type="submit"
            className="btn btn-sm w-full btn-info"
            color="primary"
            disabled={formik.isSubmitting}
          >
            Sign in
          </button>
        </div>
      </form>
    </>
  );

  return (
    <>
      <div className="w-full py-10 flex px-8 flex-col gap-3 ">
        <div>
          <Text variant="h2" className="text-primary-focus">
            Welcome Back!
          </Text>
          <Text variant="p" className="text-sm pb-2">
            Sign in to continue
          </Text>
          {form}
        </div>
      </div>
    </>
  );
};
export default LoginForm;
