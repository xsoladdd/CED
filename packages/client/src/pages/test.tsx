import React from "react";

const test: React.FC = ({}) => {
  const reg = /([A-Z])\w+/g;

  const testVar = "ABC";

  console.log(reg.test(testVar));

  return <></>;
};
export default test;
