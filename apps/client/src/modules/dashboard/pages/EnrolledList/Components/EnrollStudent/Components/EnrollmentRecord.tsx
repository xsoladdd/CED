import { FormikProps } from "formik";
import React from "react";
import Status from "../../../../../../../components/Status";
import TableLoading from "../../../../../../../components/Table/Loading";
import useStore from "../../../../../../../store/useStore";
import { generateInput } from "../../../../Shared/Components/StudentDetails/Components/helper";
import { generateSectionYear } from "../../../helper";
import { IEnrollmentForm } from "../types";

interface IEnrollmentRecordProps {
  formik: FormikProps<IEnrollmentForm>;
}

const EnrollmentRecord: React.FC<IEnrollmentRecordProps> = ({ formik }) => {
  const {
    globalVars: { year_level },
  } = useStore();

  // const [sectionArray, setSectionArray] = useState([]);
  const previousEnrollmentRecord = (
    <div className="flex flex-col place-items-center">
      <span className="font-semibold">Previous Enrollment Record</span>
      <table className="table table-compact w-2/3 table-zebra">
        <thead>
          <tr className="text-center">
            <th>StudentID</th>
            <th>Year</th>
            <th>Section</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {formik.values.student?.enrollment_records?.length !== 0 ? (
            formik.values.student?.enrollment_records?.map((props, idx) => {
              const { section, year } = generateSectionYear(
                props?.grade_level_id as string,
                props?.section_id as string,
                year_level
              );
              return (
                <tr key={idx} className="text-center">
                  <td>{props?.SID}</td>
                  <td>{year}</td>
                  <td>{section}</td>
                  <td>
                    {props?.status?.toUpperCase() === "NP" && (
                      <Status color={"red"} />
                    )}
                    {props?.status?.toUpperCase() === "FP" && (
                      <Status color={"green"} />
                    )}
                    {props?.status?.toUpperCase() === "PP" && (
                      <Status color={"yellow"} />
                    )}
                    {props?.status?.toUpperCase() === "D" && (
                      <Status color={"grey"} />
                    )}
                  </td>
                </tr>
              );
            })
          ) : (
            <TableLoading>No previous enrollment record</TableLoading>
          )}
        </tbody>
      </table>
    </div>
  );

  const sectionArray = year_level.filter(
    ({ value }) => value === formik.values.year_level
  );
  const form = (
    <>
      <div className="flex gap-2">
        {generateInput({
          // disabled: !isEditOn || !formik.values.val[idx]?.is_active,
          required: true,
          isHorizontal: true,
          id: `year_level`,
          label: "Year Level :",
          onChange: formik.handleChange,
          value: formik.values.year_level,
          inputType: "select",
          placeholder: "Select Year Level",
          selectValues: [
            ...year_level.map(({ title, value }) => ({
              text: title,
              value,
            })),
          ],
          className: "w-2/5",
        })}
        {generateInput({
          // disabled: !isEditOn || !formik.values.val[idx]?.is_active,
          required: true,
          isHorizontal: true,
          id: `section`,
          label: "Section :",
          disabled: !formik.values.year_level,
          onChange: formik.handleChange,
          value: formik.values.section,
          inputType: "select",
          placeholder: "Select Section",
          selectValues:
            sectionArray.length !== 0 && sectionArray[0].sections
              ? sectionArray[0].sections.map(({ title, id }) => ({
                  text: title,
                  value: id,
                }))
              : [],
          className: "w-2/5",
        })}
      </div>
    </>
  );
  return (
    <>
      <div className="flex flex-col gap-[5px]">
        {/* Basic Info */}
        <div className="">
          <p>
            <span className="font-semibold">Name:</span>{" "}
            {`${formik.values.student?.first_name} ${formik.values.student?.middle_name} ${formik.values.student?.last_name}`}
          </p>
          <p>
            <span className="font-semibold">LRN:</span>{" "}
            {`${formik.values.student?.LRN}`}
          </p>
          <p>
            <span className="font-semibold">Email:</span>{" "}
            {`${formik.values.student?.email}`}
          </p>
        </div>
        {previousEnrollmentRecord}
        {form}
      </div>
    </>
  );
};
export default EnrollmentRecord;
