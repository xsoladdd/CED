import React from "react";
import useStore from "../../../../store/useStore";
import SchoolYearCard from "./Components/SchoolYearCard";
import SectionCard from "./Components/SectionCard";

const Settings: React.FC = ({}) => {
  const {
    user: {
      data: { role },
    },
  } = useStore();
  return (
    <>
      <div className="flex flex-col gap-3">
        {["BA", "RT"].includes(role) && <SectionCard />}
        {["BA", "SA"].includes(role) && <SchoolYearCard />}
      </div>
    </>
  );
};
export default Settings;
