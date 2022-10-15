/* eslint-disable @typescript-eslint/no-use-before-define */

import { Formik } from "formik";
import React, { useState } from "react";
import { axiosInstance } from "../../../hooks/useAxios/helper";
import useStore from "../../../store/useStore";
import Button from "../../../ui/Button";
import { initialValue, schemaArray } from "../helper";
import PersonalDetails from "./PersonalDetails";
import Review from "./Review";
import StageInfoForm from "./StageInfoForm";
import TermsAndAgreement from "./TermsAndAgreement";
import Welcome from "./Welcome";

const NewUserStepperForm: React.FC = ({}) => {
  const [activePage, setActivePage] = useState(0);
  const {
    user: { setNewUserModalStatus },
  } = useStore();
  const numberOfStepperPages = 5;
  const {
    user: { setData },
  } = useStore();

  return (
    <>
      <Formik
        initialValues={initialValue}
        onSubmit={(values, { setSubmitting }) => {
          if (activePage !== numberOfStepperPages - 1) {
            setActivePage(activePage + 1);
            return setSubmitting(false);
          }
          axiosInstance()
            .post(`store-user/profile`, {
              ...values,
              storeName: values.name,
            })
            .then(({ data: res }) => {
              if (res.status && res.status === 1 && res.data.user) {
                setData(res.data.user);
              }
            });
          setNewUserModalStatus(false);
          return setSubmitting(false);
        }}
        validationSchema={schemaArray[activePage]}
      >
        {({
          handleSubmit,
          errors,
          handleChange,
          handleBlur,
          touched,
          values,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit} className="h-full">
            <div className="flex flex-col h-full">
              <div className=" flex-1">
                <div className=" border-b-[1px] h-[50px] flex place-items-center px-[20px]">
                  <h3 className="text-[16px]   ">
                    Greetings.
                    <span className="text-theme-primary-light-accent font-semibold"></span>
                  </h3>
                </div>

                <div className="">
                  {
                    [
                      <Welcome key={0} />,
                      <StageInfoForm
                        key={1}
                        errors={errors}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        touched={touched}
                        values={{
                          description: values.description,
                          name: values.name,
                        }}
                      />,
                      <PersonalDetails
                        key={2}
                        errors={errors}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        touched={touched}
                        values={{
                          firstName: values.firstName,
                          middleName: values.middleName,
                          lastName: values.lastName,
                          mobileNumber: values.mobileNumber,
                          landlineNumber: values.landlineNumber,
                          address: values.address,
                        }}
                      />,
                      <Review values={values} key={3} />,
                      <TermsAndAgreement
                        key={4}
                        errors={errors}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        touched={touched}
                        values={{
                          eula: values.eula,
                        }}
                      />,
                    ][activePage]
                  }
                </div>
              </div>
              <div className="h-[50px] flex place-items-center gap-4 border-t-[1px]  place-content-end pr-[20px]">
                {activePage !== 0 && (
                  <Button
                    size="sm"
                    color="info"
                    outlined
                    type="button"
                    onClick={() => setActivePage(activePage - 1)}
                    isLoading={isSubmitting}
                  >
                    Back
                  </Button>
                )}
                <Button
                  size="sm"
                  color="success"
                  type="submit"
                  isLoading={isSubmitting}
                >
                  {activePage !== numberOfStepperPages - 1 ? "Next" : " Submit"}
                </Button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};
export default NewUserStepperForm;
