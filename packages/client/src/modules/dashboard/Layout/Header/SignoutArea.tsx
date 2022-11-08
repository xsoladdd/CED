import React from "react";
import useStore from "../../../../store/useStore";

const SignoutArea: React.FC = () => {
  const {
    globalVars: { active_school_year },
  } = useStore();
  return (
    <>
      <div className="flex place-items-center gap-5">
        <span className="text-sm ">SY: {active_school_year}</span>
        <button className="link text-sm">SIGN OUT</button>
      </div>
    </>
  );
};
export default SignoutArea;
