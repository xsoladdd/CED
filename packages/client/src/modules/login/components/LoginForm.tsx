import axios from "axios";
import { Formik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Text from "../../../components/Text";
import { AUTH_SERVER_URI } from "../../../helper/global";
import { IReturn } from "../../../interfaces/types";
import { loginShema } from "../helper";
import ErrorBox from "./ErrorBox";

const LoginForm: React.FC = ({}) => {
  const [serverError, setServerError] = useState<string | undefined>(undefined);
  const { push } = useRouter();

  const form = (
    <Formik
      initialValues={{
        employeeId: ``,
        password: ``,
      }}
      validateOnBlur={false}
      validateOnChange={false}
      validationSchema={loginShema}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        setSubmitting(true);
        const {
          data,
        }: {
          data: IReturn<{
            JWT: string;
            user: {
              id: string;
            };
          }>;
        } = await axios.post(`${AUTH_SERVER_URI}p/store-user/auth`, values);
        if (data.status === 0 || data.error_params) {
          await new Promise<void>((resolve) => {
            setTimeout(() => {
              setServerError(data.error_params?.message);
              setSubmitting(false);
              resolve();
            }, 2000);
          });
        }
        if (data.data?.JWT || data.data?.user?.id) {
          setErrors({
            employeeId: undefined,
            password: undefined,
          });
          setServerError(undefined);
          localStorage.setItem("token", data.data?.JWT);
          localStorage.setItem("userId", data.data?.user.id);
          push("/dashboard");
          // Have little delay
        }
        await new Promise<void>((resolve) => {
          setTimeout(() => {
            setSubmitting(false);
            resolve();
          }, 2000);
        });
      }}
    >
      {({
        values,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <>
          <form
            className="h-full flex flex-col gap-3 py-3"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-1">
              <label htmlFor="employeeId">Emplyee ID</label>
              <input
                name="employeeId"
                onChange={handleChange}
                onBlur={handleBlur}
                className="input input-sm input-bordered"
                autoComplete="off"
                value={values.employeeId}
                placeholder="Emplyee ID"
                id="employeeId"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="password">Password</label>

              <input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                // isBordered
                value={values.password}
                className="input input-sm input-bordered"
                id="password"
                placeholder="********"
              />
            </div>
            <ErrorBox
              error={errors.employeeId || errors.password || serverError}
            />
            <div className="text-center pt-2">
              <button
                type="submit"
                className="btn btn-sm w-full btn-info"
                color="primary"
                disabled={isSubmitting}
              >
                Sign in
              </button>
            </div>
          </form>
        </>
      )}
    </Formik>
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
