import { useLazyQuery } from "@apollo/client";
import React, { useState } from "react";
import Loading from "../../../../../../components/Loading";
import Text from "../../../../../../components/Text";
import {
  GetStudentDocument,
  Student,
} from "../../../../../../graphQL/generated/graphql";
import { useEffectOnce } from "../../../../../../hooks/useEffectOnce";
import useStore from "../../../../../../store/useStore";
import AcademicRecordCard from "./Components/AcademicRecordCard";
import AddressCard from "./Components/AddressCard";
import BasicInfoCard from "./Components/BasicInfoCard";
import GuardianCard from "./Components/GuardianCard";
import RequirementCard from "./Components/RequirementCard";

// ToDelete

const StudentDetails: React.FC = ({}) => {
  const [fetchStatus, setFetchStatus] = useState<"0" | "1" | "2">("0");
  const {
    student: { selectedRecord, enrolledStudentList, setSelectedStudent },
  } = useStore();

  const [getStudent, { loading: getStudentLoading }] =
    useLazyQuery(GetStudentDocument);

  useEffectOnce(() => {
    if (!selectedRecord.id || !selectedRecord.type) {
      setFetchStatus("2");
      return;
    }
    if (selectedRecord.type === "student-record") {
      setFetchStatus("2");
      getStudent({
        variables: {
          sid: selectedRecord.id,
        },
        onCompleted: (value) => {
          if (value && value.getStudent) {
            console.log(`value.getStudent`, value.getStudent);
            setSelectedStudent(value.getStudent as Student);
            setFetchStatus("1");
          }
        },
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

      return;
    }
    return () => {};
  });

  if (fetchStatus === "2") {
    return <Text>Something went wrong</Text>;
  }
  if (fetchStatus === "0" || getStudentLoading) {
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
