import { FormikProps } from "formik";
import React from "react";
import { IselectedStudentState } from "../../../../../../../store/useStore/slices/student/types";

const RequirementsForm: React.FC<{
  formik: FormikProps<IselectedStudentState>;
}> = ({ formik }) => {
  // const isAllValueBooleanTrue = (obj: object): boolean => {
  //   return Object.values(obj).every((item) => item);
  // };

  // const isAllSelected = isAllValueBooleanTrue(formik.values.requirementInfo);

  // const selectAllSelcted: boolean = formik.values.requirementInfo.
  return (
    <div>
      <table className="table table-compact table-zebra w-3/4 ">
        <thead>
          <tr>
            <th className="w-2/4">Requirements</th>
            <th className="w-1/4">Status</th>
            <th className="w-1/4">
              <span className="flex place-items-center gap-2">
                {/* <input
                  type="checkbox"
                  className="toggle toggle-primary toggle-sm"
                  id="requirementInfo.has_report_card"
                  onChange={formik.handleChange}
                  checked={formik.values.requirementInfo?.has_report_card}
                />{" "} */}
              </span>
              <button
                className="btn btn-xs btn-outline"
                type="button"
                onClick={() => {
                  formik.setFieldValue(
                    "formik.values.requirementInfo?.has_report_card",
                    true
                  );
                  formik.setValues((old) => ({
                    ...old,
                    requirementInfo: {
                      has_baptismal: true,
                      has_form_137: true,
                      has_good_moral: true,
                      has_parent_marriage_contract: true,
                      has_psa: true,
                      has_report_card: true,
                      has_report_of_rating: true,
                      has_school_government_recognition: true,
                    },
                  }));
                }}
              >
                Select All
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className=" ">
            <td>Report of Rating (Entrance Exam)</td>
            <td>
              {formik.values.requirementInfo?.has_report_of_rating
                ? "Submitted"
                : "Not-Submitted"}
            </td>
            <td>
              <input
                type="checkbox"
                className="toggle toggle-primary toggle-sm"
                id="requirementInfo.has_report_of_rating"
                onChange={formik.handleChange}
                checked={formik.values.requirementInfo?.has_report_of_rating}
              />
            </td>
          </tr>
          <tr>
            <td>Report Card (With LRN)</td>
            <td>
              {formik.values.requirementInfo?.has_report_card
                ? "Submitted"
                : "Not-Submitted"}
            </td>
            <td>
              <input
                type="checkbox"
                className="toggle toggle-primary toggle-sm"
                id="requirementInfo.has_report_card"
                onChange={formik.handleChange}
                checked={formik.values.requirementInfo?.has_report_card}
              />
            </td>
          </tr>
          <tr>
            <td>PSA</td>
            <td>
              {formik.values.requirementInfo?.has_psa
                ? "Submitted"
                : "Not-Submitted"}
            </td>

            <td>
              <input
                type="checkbox"
                className="toggle toggle-primary toggle-sm"
                id="requirementInfo.has_psa"
                onChange={formik.handleChange}
                checked={formik.values.requirementInfo?.has_psa}
              />
            </td>
          </tr>
          <tr>
            <td>FORM-137</td>
            <td>
              {formik.values.requirementInfo?.has_form_137
                ? "Submitted"
                : "Not-Submitted"}
            </td>
            <td>
              <input
                type="checkbox"
                className="toggle toggle-primary toggle-sm"
                id="requirementInfo.has_form_137"
                onChange={formik.handleChange}
                checked={formik.values.requirementInfo?.has_form_137}
              />
            </td>
          </tr>
          <tr>
            <td>Parent Certificate of Marrige</td>
            <td>
              {formik.values.requirementInfo?.has_parent_marriage_contract
                ? "Submitted"
                : "Not-Submitted"}
            </td>
            <td>
              <input
                type="checkbox"
                className="toggle toggle-primary toggle-sm"
                id="requirementInfo.has_parent_marriage_contract"
                onChange={formik.handleChange}
                checked={
                  formik.values.requirementInfo?.has_parent_marriage_contract
                }
              />
            </td>
          </tr>
          <tr>
            <td>Good Moral</td>
            <td>
              {formik.values.requirementInfo?.has_good_moral
                ? "Submitted"
                : "Not-Submitted"}
            </td>
            <td>
              <input
                type="checkbox"
                className="toggle toggle-primary toggle-sm"
                id="requirementInfo.has_good_moral"
                onChange={formik.handleChange}
                checked={formik.values.requirementInfo?.has_good_moral}
              />
            </td>
          </tr>
          <tr>
            <td>Baptismal (Photocopy)</td>
            <td>
              {formik.values.requirementInfo?.has_baptismal
                ? "Submitted"
                : "Not-Submitted"}
            </td>
            <td>
              <input
                type="checkbox"
                className="toggle toggle-primary toggle-sm"
                id="requirementInfo.has_baptismal"
                onChange={formik.handleChange}
                checked={formik.values.requirementInfo?.has_baptismal}
              />
            </td>
          </tr>
          <tr>
            <td>School Government Recognition</td>
            <td>
              {formik.values.requirementInfo?.has_school_government_recognition
                ? "Submitted"
                : "Not-Submitted"}
            </td>
            <td>
              <input
                type="checkbox"
                className="toggle toggle-primary toggle-sm"
                id="requirementInfo.has_school_government_recognition"
                onChange={formik.handleChange}
                checked={
                  formik.values.requirementInfo
                    ?.has_school_government_recognition
                }
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default RequirementsForm;
