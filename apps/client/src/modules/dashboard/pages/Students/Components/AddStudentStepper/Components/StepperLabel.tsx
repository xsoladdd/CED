import React from "react";
import { joinClass } from "../../../../../../../utils/joinClass";

const StepperLabel: React.FC<{
  formIndex: number;
  changeIndex: (idx: number) => void;
}> = ({ formIndex }) => {
  const stepArray = [
    "Basic Details",
    "Address",
    "Parent/Guardian",
    "Requirements",
    "Academic Background",
    "Finalize",
  ];

  return (
    <>
      <div className="w-full flex justify-center py-8 ">
        <ul className="steps">
          {stepArray.map((title, index) => (
            <li
              className={joinClass(
                "step",
                formIndex >= index ? "step-primary" : ""
              )}
              key={index}
              // onClick={() => formIndex !== index && changeIndex(index)}
            >
              {title}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
export default StepperLabel;
