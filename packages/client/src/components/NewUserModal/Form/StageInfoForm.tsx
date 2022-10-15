import React from "react";
import { IStepperData } from "../types";
import FormInput from "./FormInput";
import Wrapper from "./Wrapper";

const StageInfoForm: React.FC<
  IStepperData<
    { name: string; description: string },
    {
      name?: boolean;
      description?: boolean;
    },
    { name?: string; description?: string }
  >
> = ({ handleChange, values, errors, touched, handleBlur }) => {
  return (
    <>
      <Wrapper
        title="A lil bit about who are you."
        subtitle="What should we call you and how do you describe yourself?"
      >
        <div className="flex flex-col gap-3">
          <FormInput
            value={values.name}
            error={errors.name}
            touched={touched.name}
            id={"name"}
            label={"What should we call you?"}
            required
            placeholder="Please enter your stage / company name"
            handleBlur={handleBlur}
            handleChange={handleChange}
          />

          <FormInput
            value={values.description}
            error={errors.description}
            touched={touched.description}
            id={"description"}
            label={"How do you describe yourself?"}
            type="textarea"
            placeholder="Short description"
            handleBlur={handleBlur}
            handleChange={handleChange}
          />
        </div>
      </Wrapper>
    </>
  );
};
export default StageInfoForm;
