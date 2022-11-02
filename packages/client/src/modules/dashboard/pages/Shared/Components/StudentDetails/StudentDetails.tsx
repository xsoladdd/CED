import React, { useState } from "react";
import Loading from "../../../../../../components/Loading";
import Text from "../../../../../../components/Text";
import { useEffectOnce } from "../../../../../../hooks/useEffectOnce";
import useStore from "../../../../../../store/useStore";
import AcademicRecordCard from "./Components/AcademicRecordCard";
import AddressCard from "./Components/AddressCard";
import BasicInfoCard from "./Components/BasicInfoCard";
import GuardianCard from "./Components/GuardianCard";
import RequirementCard from "./Components/RequirementCard";

// ToDelete

const mockData = {
  addressInfo: {
    barangay: "Molino VII",
    city: "Bacoor City",
    no: "4102",
    province: "Cavite",
    region: "Region IV-A (CALABARZON)",
    street: "4102",
    subdiv: "San Lorenzo Ruiz ",
    zipcode: "4102",
  },
  guardianInfo: {
    father: {
      email: "",
      firstName: "",
      lastName: "",
      middleName: "",
      mobileNumber: "",
    },
    guardian: {
      email: "",
      firstName: "",
      lastName: "",
      middleName: "",
      mobileNumber: "",
    },
    mother: {
      email: "",
      firstName: "",
      lastName: "",
      middleName: "",
      mobileNumber: "",
    },
  },
  requirementInfo: {
    has_form_137: false,
    has_baptismal: false,
    has_good_moral: true,
    has_parent_marriage_contract: false,
    has_psa: false,
    has_report_card: true,
    has_report_of_rating: true,
    has_school_government_recognition: false,
  },
  academicInfo: [],
};

const StudentDetails: React.FC = ({}) => {
  const [fetchStatus, setFetchStatus] = useState<"0" | "1" | "2">("0");
  const {
    student: {
      selectedRecord,
      setSelectedStudent,
      studentList,
      enrolledStudentList,
    },
  } = useStore();

  useEffectOnce(() => {
    if (!selectedRecord.id || !selectedRecord.type) {
      setFetchStatus("2");
      return;
    }
    if (selectedRecord.type === "student-record") {
      const getStudentDataArr = studentList.filter(
        ({ id }) => id === selectedRecord.id
      );
      if (getStudentDataArr.length === 0) {
        setFetchStatus("2");
        return;
      }
      setFetchStatus("1");
      const { id, status, ...rest } = getStudentDataArr[0];
      setSelectedStudent({
        basicInfo: {
          ...rest,
        },
        ...mockData,
      });
      return;
    }
    if (selectedRecord.type === "enrollment-record") {
      const getStudentDataArr = enrolledStudentList.filter(
        ({ id }) => id === selectedRecord.id
      );
      if (getStudentDataArr.length === 0) {
        setFetchStatus("2");
        return;
      }
      setFetchStatus("1");
      // SID,grade_level,section,status
      const { student } = getStudentDataArr[0];
      setSelectedStudent({
        basicInfo: {
          ...student,
        },
        ...mockData,
      });
      return;
    }
    return () => {};
  });

  if (fetchStatus === "2") {
    return <Text>Something went wrong</Text>;
  }
  if (fetchStatus === "0") {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-5">
      <BasicInfoCard />
      <AddressCard />
      <GuardianCard />
      <RequirementCard />
      <AcademicRecordCard />
    </div>
  );
};
export default StudentDetails;
