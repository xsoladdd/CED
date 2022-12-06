import React from "react";
import Card, { CardHeader } from "../../../../../../../../components/Card";
import TableLoading from "../../../../../../../../components/Table/Loading";
import useStore from "../../../../../../../../store/useStore";
import { generateSectionYear } from "../../../../../EnrolledList/helper";

const EnrollmentRecordCard: React.FC = ({}) => {
  const {
    student: {
      selectedStudent: { enrollment_records },
    },
    globalVars: { year_level },
  } = useStore();

  const header = (
    <div className="w-full flex justify-between ">
      <CardHeader title={`Enrollment Record`} />
    </div>
  );

  const tbody = enrollment_records ? (
    enrollment_records.map((props, idx) => {
      const year_section = generateSectionYear(
        props?.grade_level_id ? props.grade_level_id : "",
        props?.section_id ? props.section_id : "",
        year_level
      );
      const SID = props?.SID ? props.SID : "";

      return (
        <tr key={idx}>
          <td>{SID}</td>
          {/* <td>{props?.section_id}</td> */}
          {/* <td>{props?.grade_level_id}</td> */}
          <td>{`${year_section.year} - ${year_section.section}`}</td>
          <td>{props?.status ? props.status : ""}</td>
          {/* <td>{props?.SID ? props.SID : ""}</td> */}
        </tr>
      );
    })
  ) : (
    <TableLoading>No previous record found</TableLoading>
  );

  return (
    <>
      <Card className="w-full" header={header}>
        <table className="table table-compact table-zebra w-3/4">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Year Level & Section</th>
              <th>Status</th>
              {/* <th>Action</th> */}
            </tr>
          </thead>
          <tbody>{tbody}</tbody>
        </table>
      </Card>
    </>
  );
};
export default EnrollmentRecordCard;
