import React from "react";
import AcademicRecordCard from "./Components/AcademicRecordCard";
import AddressCard from "./Components/AddressCard";
import BasicInfoCard from "./Components/BasicInfoCard";
import GuardianCard from "./Components/GuardianCard";

const StudentDetails: React.FC = ({}) => {
  return (
    <div className="flex flex-col gap-5">
      <BasicInfoCard />
      <AddressCard />
      <GuardianCard />
      <AcademicRecordCard />
    </div>
  );
};
export default StudentDetails;
