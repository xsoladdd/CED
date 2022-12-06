import React from "react";
import SchoolYearCard from "./Components/SchoolYearCard";
import SectionCard from "./Components/SectionCard";

const Settings: React.FC = ({}) => {
  return (
    <>
      <div className="flex flex-col gap-3">
        <SectionCard />
        <SchoolYearCard />
      </div>
    </>
  );
};
export default Settings;
