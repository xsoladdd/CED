import { useFormik } from "formik";
import React from "react";
import { FiEdit, FiSave, FiX } from "react-icons/fi";
import Card, { CardHeader } from "../../../../../../../../components/Card";
import WarningModal from "../../../../../../../../components/WarningModal";
import useToggle from "../../../../../../../../hooks/useToggle";
import useStore from "../../../../../../../../store/useStore";

const RequirementCard: React.FC = ({}) => {
  const { status: isEditOn, toggle } = useToggle(false);
  const { status: greenModalStatus, toggle: toggleGreenModalStatus } =
    useToggle(false);
  const { status: modalStatus, toggle: toggleModal } = useToggle(false);
  const {
    student: {
      setSelectedRequirementsInfo,
      selectedStudent: { requirementInfo },
    },
  } = useStore();
  const formik = useFormik({
    initialValues: requirementInfo,
    enableReinitialize: true,
    onSubmit: (values) => {
      // qwer Fix Submitting with API
      setSelectedRequirementsInfo(values);
      toggleGreenModalStatus();
      console.log(values);
      toggle();
    },
  });
  const header = (
    <div className="w-full flex justify-between ">
      <CardHeader title={`Requirements`} subTitle={isEditOn ? "Edit" : ""} />
      {!isEditOn ? (
        <div className="flex gap-2">
          <button
            className="btn btn-xs btn-info"
            onClick={(e) => {
              e.preventDefault();
              toggle();
            }}
          >
            <FiEdit />
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <button
            className="btn btn-xs btn-success"
            type="button"
            onClick={() => toggleGreenModalStatus()}
          >
            <FiSave />
          </button>
          <button
            className="btn btn-xs btn-error"
            onClick={(e) => {
              e.preventDefault();
              toggleModal();
            }}
          >
            <FiX />
          </button>
        </div>
      )}
    </div>
  );

  const content = (
    <>
      <table className="table table-compact table-zebra w-3/4 ">
        <thead>
          <tr>
            <th className="w-2/4">Requirements</th>
            <th className="w-1/4">Status</th>
            {isEditOn && <th className="w-1/4">Action</th>}
          </tr>
        </thead>
        <tbody>
          <tr className=" ">
            <td>Report of Raiting (Entrance Exam)</td>
            <td>
              {formik.values.has_report_of_rating
                ? "Submitted"
                : "Not-Submitted"}
            </td>
            {isEditOn && (
              <td>
                <input
                  type="checkbox"
                  className="toggle toggle-primary toggle-sm"
                  id="has_report_of_rating"
                  onChange={formik.handleChange}
                  checked={formik.values.has_report_of_rating}
                />
              </td>
            )}
          </tr>
          <tr>
            <td>Report Card (With LRN)</td>
            <td>
              {formik.values.has_report_card ? "Submitted" : "Not-Submitted"}
            </td>
            {isEditOn && (
              <td>
                <input
                  type="checkbox"
                  className="toggle toggle-primary toggle-sm"
                  id="has_report_card"
                  onChange={formik.handleChange}
                  checked={formik.values.has_report_card}
                />
              </td>
            )}
          </tr>
          <tr>
            <td>PSA</td>
            <td>{formik.values.has_psa ? "Submitted" : "Not-Submitted"}</td>
            {isEditOn && (
              <td>
                <input
                  type="checkbox"
                  className="toggle toggle-primary toggle-sm"
                  id="has_psa"
                  onChange={formik.handleChange}
                  checked={formik.values.has_psa}
                />
              </td>
            )}
          </tr>
          <tr>
            <td>FORM-137</td>
            <td>
              {formik.values.has_form_137 ? "Submitted" : "Not-Submitted"}
            </td>
            {isEditOn && (
              <td>
                <input
                  type="checkbox"
                  className="toggle toggle-primary toggle-sm"
                  id="has_form_137"
                  onChange={formik.handleChange}
                  checked={formik.values.has_form_137}
                />
              </td>
            )}
          </tr>
          <tr>
            <td>Parent Certificate of Marrige</td>
            <td>
              {formik.values.has_parent_marriage_contract
                ? "Submitted"
                : "Not-Submitted"}
            </td>
            {isEditOn && (
              <td>
                <input
                  type="checkbox"
                  className="toggle toggle-primary toggle-sm"
                  id="has_parent_marriage_contract"
                  onChange={formik.handleChange}
                  checked={formik.values.has_parent_marriage_contract}
                />
              </td>
            )}
          </tr>
          <tr>
            <td>Good Moral</td>
            <td>
              {formik.values.has_good_moral ? "Submitted" : "Not-Submitted"}
            </td>{" "}
            {isEditOn && (
              <td>
                <input
                  type="checkbox"
                  className="toggle toggle-primary toggle-sm"
                  id="has_good_moral"
                  onChange={formik.handleChange}
                  checked={formik.values.has_good_moral}
                />
              </td>
            )}
          </tr>
          <tr>
            <td>Baptismal (Photocopy)</td>
            <td>
              {formik.values.has_baptismal ? "Submitted" : "Not-Submitted"}
            </td>{" "}
            {isEditOn && (
              <td>
                <input
                  type="checkbox"
                  className="toggle toggle-primary toggle-sm"
                  id="has_baptismal"
                  onChange={formik.handleChange}
                  checked={formik.values.has_baptismal}
                />
              </td>
            )}
          </tr>
          <tr>
            <td>School Government Recognition</td>
            <td>
              {formik.values.has_school_government_recognition
                ? "Submitted"
                : "Not-Submitted"}
            </td>{" "}
            {isEditOn && (
              <td>
                <input
                  type="checkbox"
                  className="toggle toggle-primary toggle-sm"
                  id="has_school_government_recognition"
                  onChange={formik.handleChange}
                  checked={formik.values.has_school_government_recognition}
                />
              </td>
            )}
          </tr>
        </tbody>
      </table>
    </>
  );

  return (
    <>
      <WarningModal
        status={modalStatus}
        handleClose={() => toggleModal()}
        handleProceed={() => {
          formik.resetForm();
          toggle();
          toggleModal();
        }}
      >
        {`Changes won't be save. are you sure you want to cancel?`}
      </WarningModal>
      <WarningModal
        color="green"
        status={greenModalStatus}
        handleClose={() => toggleGreenModalStatus()}
        handleProceed={() => {
          formik.submitForm();
        }}
      >
        {`Are you sure that you want to save the following changes?`}
      </WarningModal>
      <form className="w-full" onSubmit={formik.handleSubmit}>
        <Card className="w-full" header={header}>
          <div className="flex gap-4 flex-col">{content}</div>
        </Card>
      </form>
    </>
  );
};

export default RequirementCard;
