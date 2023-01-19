import { useLazyQuery } from "@apollo/client";
import React, { useState } from "react";
import Loading from "../../../../../../components/Loading";
import Text from "../../../../../../components/Text";
import {
  EnrolledRecord,
  GetEnrollmentRecordDocument,
  GetStudentDocument,
  Student,
} from "../../../../../../graphQL/generated/graphql";
import { useEffectOnce } from "../../../../../../hooks/useEffectOnce";
import useStore from "../../../../../../store/useStore";
import AcademicRecordCard from "./Components/AcademicRecordCard";
import AddressCard from "./Components/AddressCard";
import BasicInfoCard from "./Components/BasicInfoCard";
import EnrollmentInfoCard from "./Components/EnrollmentInfoCard";
import EnrollmentRecordCard from "./Components/EnrollmentRecordCard";
import GuardianCard from "./Components/GuardianCard";
import RequirementCard from "./Components/RequirementCard";

// ToDelete

const StudentDetails: React.FC = ({}) => {
  const [fetchStatus, setFetchStatus] = useState<"0" | "1" | "2">("0");
  const {
    student: { selectedRecord, setSelectedStudent },
  } = useStore();

  const [getStudent, { loading: getStudentLoading }] =
    useLazyQuery(GetStudentDocument);
  const [getEnrollmentRecord, { loading: getEnrollmentRecordLoading }] =
    useLazyQuery(GetEnrollmentRecordDocument);

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
            setSelectedStudent(value.getStudent as Student);
            setFetchStatus("1");
          }
        },
      });
      return;
    }
    if (selectedRecord.type === "enrollment-record") {
      if (!selectedRecord.id || !selectedRecord.type) {
        setFetchStatus("2");
        return;
      }
      getEnrollmentRecord({
        variables: {
          eid: selectedRecord.id,
        },
        onCompleted: (value) => {
          const typedValue =
            value.getEnrollmentRecord as unknown as EnrolledRecord;
          if (typedValue && typedValue.student) {
            setSelectedStudent(typedValue.student);
            setFetchStatus("1");
          }
        },
        notifyOnNetworkStatusChange: true,
        fetchPolicy: "network-only",
      });
      setFetchStatus("1");
      return;
    }
    return () => {};
  });

  if (fetchStatus === "2") {
    return <Text>Something went wrong</Text>;
  }
  if (fetchStatus === "0" || getStudentLoading || getEnrollmentRecordLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-5">
      {selectedRecord.type === "enrollment-record" && <EnrollmentInfoCard />}
      {selectedRecord.type === "student-record" && <EnrollmentRecordCard />}
      <BasicInfoCard />
      <AddressCard />
      <GuardianCard />
      <RequirementCard />
      <AcademicRecordCard />
    </div>
  );
};
export default StudentDetails;
