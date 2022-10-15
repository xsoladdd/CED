import React from "react";
import { IStepperData } from "../types";
import FormInput from "./FormInput";
import Wrapper from "./Wrapper";

const PersonalDetails: React.FC<
  IStepperData<
    {
      firstName: string;
      middleName: string;
      lastName: string;
      mobileNumber: string;
      landlineNumber: string;
      address: string;
    },
    {
      firstName?: boolean;
      middleName?: boolean;
      lastName?: boolean;
      mobileNumber?: boolean;
      landlineNumber?: boolean;
      address?: boolean;
    },
    {
      firstName?: string;
      middleName?: string;
      lastName?: string;
      mobileNumber?: string;
      landlineNumber?: string;
      address?: string;
    }
  >
> = ({ handleChange, values, errors, touched, handleBlur }) => {
  return (
    <>
      <Wrapper
        title="Personal Details."
        subtitle="In able to sell stuff, we need to record your store/personal details."
      >
        <div className="flex flex-col gap-1">
          <div className="grid grid-col-3 grid-flow-col gap-4">
            <FormInput
              value={values.firstName}
              error={errors.firstName}
              touched={touched.firstName}
              id={"firstName"}
              label={"Enter your name"}
              required
              placeholder="First name"
              handleBlur={handleBlur}
              handleChange={handleChange}
            />
            <FormInput
              value={values.middleName}
              error={errors.middleName}
              touched={touched.middleName}
              id={"middleName"}
              placeholder="Middle name"
              handleBlur={handleBlur}
              handleChange={handleChange}
            />
            <FormInput
              value={values.lastName}
              error={errors.lastName}
              touched={touched.lastName}
              id={"lastName"}
              required
              placeholder="Last name"
              handleBlur={handleBlur}
              handleChange={handleChange}
            />
          </div>
          <div className="grid grid-col-3 grid-flow-col gap-4">
            <FormInput
              value={values.mobileNumber}
              error={errors.mobileNumber}
              touched={touched.mobileNumber}
              id={"mobileNumber"}
              required
              label="Contact information"
              placeholder="Mobile name"
              handleBlur={handleBlur}
              handleChange={handleChange}
            />
            <FormInput
              value={values.landlineNumber}
              error={errors.landlineNumber}
              touched={touched.landlineNumber}
              id={"landlineNumber"}
              required
              placeholder="Landline number"
              handleBlur={handleBlur}
              handleChange={handleChange}
            />
          </div>

          <div className="grid grid-col-3 grid-flow-col gap-4">
            <FormInput
              value={values.address}
              error={errors.address}
              touched={touched.address}
              id={"address"}
              label="Address"
              type="textarea"
              required
              placeholder="Address"
              handleBlur={handleBlur}
              handleChange={handleChange}
            />
          </div>
        </div>
      </Wrapper>
    </>
  );
};
export default PersonalDetails;
