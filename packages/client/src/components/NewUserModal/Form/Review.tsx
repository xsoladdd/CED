import React from "react";
import { initialValue } from "../helper";
import Wrapper from "./Wrapper";

interface IReviewProps {
  values: typeof initialValue;
}

const Review: React.FC<IReviewProps> = ({ values }) => {
  const generateList = (label: string, value: any) => {
    return (
      <>
        <div className="flex gap-2">
          <span className="font-semibold">{label}</span>

          <span>{value}</span>
        </div>
      </>
    );
  };

  return (
    <>
      <Wrapper
        title="Before we proceed ..."
        subtitle="Let’s review the data you input."
      >
        {generateList("Company / Stage Name: ", values.name)}
        {generateList("Description: ", values.description)}
        {generateList(
          "Contact name: ",
          `${values.firstName} ${values.middleName} ${values.lastName}`
        )}
        {generateList(
          "Contact number: ",
          `${values.mobileNumber} ${
            values.landlineNumber ? `/ ${values.landlineNumber}` : ""
          }`
        )}
        {generateList("Addrses: ", values.address)}
      </Wrapper>
    </>
  );
};
export default Review;
