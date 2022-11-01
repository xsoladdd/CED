import { IyearLevel } from "../../../../../../store/useStore/slices/global/types";
import { IenrolledStudent } from "../../../../../../store/useStore/slices/student/types";
import { toReadableDate } from "../../../../../../utils/toReadableDate";
import { generateSectionYear } from "../../helper";
import { IadditionalData, IdataID, returnGenerateBorder } from "./types";

export const generateBorder = (
  top: number,
  right: number,
  bottom: number,
  left: number
): returnGenerateBorder => {
  return {
    borderColor: "black",
    borderStyle: "solid",
    borderBottomWidth: `${bottom !== 0 ? `${bottom}px` : 0}`,
    borderLeftWidth: `${left !== 0 ? `${bottom}px` : 0}`,
    borderRightWidth: `${right !== 0 ? `${bottom}px` : 0}`,
    borderTopWidth: `${top !== 0 ? `${bottom}px` : 0}`,
  };
};

export const generateContentArray = (
  student_data: IenrolledStudent,
  year_level: Array<IyearLevel>,
  additional_data: IadditionalData
): Array<Array<IdataID>> => {
  const { section, year } = generateSectionYear(
    student_data.grade_level,
    student_data.section,
    year_level
  );
  return [
    [
      {
        label: "Name :",
        value: `${student_data.student.first_name} ${student_data.student.middle_name} ${student_data.student.last_name}`,
      },
      { label: "Gender :", value: student_data.student.gender },
    ],
    [
      { label: "Birthday :", value: student_data.student.birthday },
      { label: "LRN :", value: student_data.student.LRN },
    ],
    [{ label: "Address :", value: additional_data.addressString }],
    [{ label: "Name of Parent/Guardian :", value: additional_data.parentName }],
    [
      { label: "Contact No. :", value: student_data.student.mobile_number },
      { label: "Email :", value: student_data.student.email },
    ],
    [
      { label: "Level :", value: year },
      { label: "Section :", value: section },
    ],
    [
      { label: "Checked By :", value: "" },
      { label: "Date :", value: toReadableDate(new Date()) },
    ],
    [{ label: "Remarks :", value: "" }],
    [
      { label: "Admission :", value: "" },
      { label: "Enlisted and for enrollment :", value: "" },
      { label: "Signature & Date:", value: "" },
    ],
    [
      { label: "Cashier :", value: "" },
      { label: "Paid :", value: "" },
      { label: "Signature & Date:", value: "" },
    ],
    [
      { label: "Registrar :", value: "" },
      { label: "Temporary/Provisionary :", value: "" },
      { label: "Signature & Date:", value: "" },
    ],
    [
      { label: "Registrar :", value: "" },
      { label: "Officially Enrolled :", value: "" },
      { label: "Signature & Date:", value: "" },
    ],
    [
      { label: "Registrar :", value: "" },
      { label: "OLD STUDENT :", value: "" },
      { label: "Signature & Date:", value: "" },
    ],
    [
      { label: "Registrar :", value: "" },
      { label: "RETURNEE :", value: "" },
      { label: "Signature & Date:", value: "" },
    ],
    [
      { label: "Registrar :", value: "" },
      { label: "TRANSFERED IN :", value: "" },
      { label: "Signature & Date:", value: "" },
    ],
  ];
};
