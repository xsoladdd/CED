import { FormikProps } from "formik";
import React from "react";
import { IselectedStudentState } from "../../../../../../../store/useStore/slices/student/types";
import { formatDateReadable } from "../../../../../../../utils/formatDateReadable";
import { generateField } from "./helper";

const ReviewForms: React.FC<{
  formik: FormikProps<IselectedStudentState>;
}> = ({ formik }) => {
  const basicInfo = (
    <div className="">
      <h2 className="text-xl font-bold pb-2">Basic Information:</h2>
      <div className="grid grid-cols-3 gap-[5px]">
        {generateField(
          "Name",
          `
${formik.values.basicInfo.first_name} ${formik.values.basicInfo.middle_name} ${formik.values.basicInfo.last_name}`
        )}
        {generateField("LRN", formik.values.basicInfo.LRN)}
        {generateField("Email", formik.values.basicInfo.email)}
        {generateField("Mobile number", formik.values.basicInfo.contact_number)}
        {generateField(
          "Birthday",
          formatDateReadable(formik.values.basicInfo.birthday)
        )}
        {generateField(
          "Gender",
          formik.values.basicInfo.gender === "M" ? "Male" : "Female"
        )}
      </div>
    </div>
  );
  const addressInfo = (
    <div className="">
      {generateField(
        "Address",
        `
${formik.values.addressInfo.no} ${formik.values.addressInfo.street},
${formik.values.addressInfo.subdiv}, ${formik.values.addressInfo.barangay},
${formik.values.addressInfo.city}, ${formik.values.addressInfo.province},
${formik.values.addressInfo.region},${formik.values.addressInfo.zip}
`
      )}
    </div>
  );
  const parentGuardianInfo = (
    <div className="py-5">
      <h2 className="text-xl font-bold pb-2">Parent information:</h2>
      {formik.values.guardianInfo.father.first_name && (
        <>
          <h3 className="text-lg font-semibold">Father:</h3>
          <div className="grid grid-cols-3 gap-[5px]">
            {generateField(
              "Name",
              `
${formik.values.guardianInfo.father.first_name} ${formik.values.guardianInfo.father.middle_name} ${formik.values.guardianInfo.father.last_name}`
            )}
            {generateField("Email", formik.values.guardianInfo.father.email)}
            {generateField(
              "Mobile number",
              formik.values.guardianInfo.father.contact_number
            )}
          </div>
        </>
      )}

      {formik.values.guardianInfo.mother.first_name && (
        <>
          <h3 className="text-lg font-semibold">Mother:</h3>
          <div className="grid grid-cols-3 gap-[5px]">
            {generateField(
              "Name",
              `
${formik.values.guardianInfo.mother.first_name} ${formik.values.guardianInfo.mother.middle_name} ${formik.values.guardianInfo.mother.last_name}`
            )}
            {generateField("Email", formik.values.guardianInfo.mother.email)}
            {generateField(
              "Mobile Number",
              formik.values.guardianInfo.mother.contact_number
            )}
          </div>
        </>
      )}

      {formik.values.guardianInfo.guardian.first_name && (
        <>
          <h3 className="text-lg font-semibold">Guardian:</h3>
          <div className="grid grid-cols-4 gap-[5px]">
            {generateField(
              "Name",
              `
${formik.values.guardianInfo.guardian.first_name} ${formik.values.guardianInfo.guardian.middle_name} ${formik.values.guardianInfo.guardian.last_name}`
            )}
            {generateField("Email", formik.values.guardianInfo.guardian.email)}
            {generateField(
              "Mobile number",
              formik.values.guardianInfo.guardian.contact_number
            )}
          </div>
        </>
      )}
    </div>
  );
  const academicInfo = (
    <>
      <div className="pb-5">
        <h2 className="text-xl font-bold pb-2">Academic Record:</h2>
        <table className="table table-compact table-zebra ">
          <thead>
            <tr>
              <th className="w-3/6">School</th>
              <th className="w-1/6">School year</th>
              <th className="w-2/6">Academic level</th>
            </tr>
          </thead>
          <tbody>
            {formik.values.academicInfo
              .filter(({ school }) => !!school)
              .map(({ academicLevel, school, schoolYear }, idx) => (
                <tr key={idx}>
                  <td>{school}</td>
                  <td>{schoolYear}</td>
                  <td>{academicLevel}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
  const requirementsInfo = (
    <div className="">
      {generateField(
        "Requirements Submitted",
        [
          formik.values.requirementInfo?.has_report_of_rating
            ? "Report of rating"
            : undefined,
          formik.values.requirementInfo?.has_baptismal
            ? "Baptismal"
            : undefined,
          formik.values.requirementInfo?.has_form_137 ? "Form 137" : undefined,
          formik.values.requirementInfo?.has_good_moral
            ? "Good moral"
            : undefined,
          formik.values.requirementInfo?.has_parent_marriage_contract
            ? "Parent marriage contract"
            : undefined,
          formik.values.requirementInfo?.has_psa ? "PSA" : undefined,
          formik.values.requirementInfo?.has_report_card
            ? "Report card"
            : undefined,
          formik.values.requirementInfo?.has_school_government_recognition
            ? "Government recognition"
            : undefined,
        ]
          .filter((data) => typeof data !== "undefined")
          .join(", ")
      )}
    </div>
  );

  return (
    <>
      <div className="flex flex-col ">
        {basicInfo}
        {addressInfo}
        {requirementsInfo}
        {parentGuardianInfo}
        {academicInfo}
      </div>
    </>
  );
};
export default ReviewForms;
