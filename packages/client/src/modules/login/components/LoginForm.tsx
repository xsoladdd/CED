import { Formik } from "formik";
import React, { useState } from "react";
import Button from "../../../ui/Button";
import { Checkbox, Input, Label } from "../../../ui/Forms";
import { loginShema } from "../helper";
import ErrorBox from "./ErrorBox";
import axios from "axios";
import { IReturn } from "../../../interfaces/types";
import { useRouter } from "next/router";
import { AUTH_SERVER_URI } from "../../../helper/global";
import Text from "../../../ui/Text";

const LoginForm: React.FC = ({}) => {
  const [rememberMe, setRememberMe] = useState(false);
  const [serverError, setServerError] = useState<string | undefined>(undefined);
  const { push } = useRouter();

  const form = (
    <Formik
      initialValues={{
        email: ``,
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
            email: undefined,
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
              <Label htmlFor="email" text="Email :" />
              <Input
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                className={``}
                autoComplete="off"
                value={values.email}
                isBordered
                placeholder="ie: #####@gmail.com"
                id="email"
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="password" text="Password :" />

              <Input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                isBordered
                value={values.password}
                className={``}
                id="password"
                placeholder="********"
              />
            </div>
            <Checkbox
              label="Remember Password?"
              color="primary"
              size="sm"
              checked={rememberMe}
              id="remember-me"
              onChange={() => setRememberMe(!rememberMe)}
            />
            <ErrorBox error={errors.email || errors.password || serverError} />
            <div className="text-center pt-2">
              <Button
                type="submit"
                className="w-full"
                color="primary"
                size="sm"
                isLoading={isSubmitting}
              >
                Sign in
              </Button>
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
