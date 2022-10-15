import React from "react";
import { Checkbox, Label } from "../../../ui/Forms";
import Text from "../../../ui/Text";
import { joinClass } from "../../../utils/joinClass";
import { IStepperData } from "../types";
import Wrapper from "./Wrapper";

const TermsAndAgreement: React.FC<
  IStepperData<
    {
      eula: boolean;
    },
    { eula?: boolean },
    { eula?: string }
  >
> = ({ errors, handleChange, touched, values }) => {
  return (
    <>
      <Wrapper title="Terms and agreement">
        <div className="">
          <p className="text-[16px]">
            Bacon ipsum dolor amet sausage jerky strip steak, sirloin meatloaf
            meatball shankle chislic. Ribeye strip steak picanha short ribs,
            porchetta burgdoggen pork loin sirloin turducken prosciutto salami
            chuck turkey beef. Sirloin ball tip tail boudin. Beef pastrami
            t-bone shoulder tongue, cupim porchetta
          </p>
          <div className="w-full flex flex-col place-items-end py-3  ">
            <div className="flex flex-row place-items-center   ">
              <Checkbox
                checked={values.eula}
                onChange={handleChange}
                id="eula"
              />
              <Label
                text="Accept terms and condition"
                id="eula"
                className={joinClass(
                  "text-[14px]",
                  touched.eula && errors.eula ? "text-red-500" : ""
                )}
              />
            </div>
          </div>
          {touched.eula && errors.eula && (
            <Text variant="error">{errors.eula}</Text>
          )}
        </div>
      </Wrapper>
    </>
  );
};
export default TermsAndAgreement;
