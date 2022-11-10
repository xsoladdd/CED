import { useQuery } from "@apollo/client";
import React from "react";
import { MeowQueryDocument } from "../graphQL/generated/graphql";

const Test: React.FC = () => {
  const { data } = useQuery(MeowQueryDocument);

  return (
    <>
      <button className="text-dark-contrast">
        {JSON.stringify(data?.meow)}
      </button>
    </>
  );
};
export default Test;
