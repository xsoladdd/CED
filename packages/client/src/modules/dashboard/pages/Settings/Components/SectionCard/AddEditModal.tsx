import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import Modal from "../../../../../../components/Modal";
import { AddEditSectionDocument } from "../../../../../../graphQL/generated/graphql";
import useStore from "../../../../../../store/useStore";
import { generateInput } from "../../../Shared/Components/StudentDetails/Components/helper";
import { addSectionSchema } from "./helper";

const AddEditModal: React.FC<{
  status?: boolean;
  handleClose?: () => void;
  transaction?: "add" | "edit";
  default_year_level?: string;
  selected_id?: string;
  default_title?: string;
}> = ({
  status = false,
  handleClose,
  transaction = "add",
  default_year_level = "",
  selected_id,
  default_title = "",
}) => {
  const {
    globalVars: { year_level, insertNewSection, editNewSection },
  } = useStore();

  const [addEditSection] = useMutation(AddEditSectionDocument);

  const formik = useFormik({
    initialValues: {
      year_level: "",
      section_name: "",
    },
    validationSchema: addSectionSchema,
    onSubmit: (value, { setSubmitting }) => {
      addEditSection({
        variables: {
          input: {
            name: value.section_name,
            year_level: value.year_level,
            id: transaction === "edit" ? selected_id : undefined,
          },
        },
        onCompleted: (ret) => {
          setSubmitting(false);
          if (transaction === "add" && ret) {
            console.log(ret);
            insertNewSection({
              id: ret.addEditSection?.id as string,
              title: ret.addEditSection?.name as string,
              year_level: ret.addEditSection?.year_level as string,
              status: true,
            });
          } else {
            editNewSection({
              id: ret.addEditSection?.id as string,
              title: ret.addEditSection?.name as string,
              year_level: ret.addEditSection?.year_level as string,
              status: true,
            });
          }
          if (handleClose) handleClose();
        },
      });
    },
  });

  useEffect(() => {
    formik.setFieldValue("year_level", default_year_level);
    formik.setFieldValue("section_name", default_title);
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [default_year_level, default_title]);
  return (
    <>
      <Modal
        title={transaction === "add" ? "Add new section" : "Edit section"}
        status={status}
        handleClose={handleClose}
        size="lg"
        footer={
          <div className=" flex gap-2 justify-end">
            <button
              className="btn btn-link btn-sm"
              onClick={() => {
                if (handleClose) handleClose();
              }}
            >
              Cancel
            </button>
            <button
              className="btn btn-info btn-sm"
              disabled={formik.isSubmitting}
              type="submit"
              onClick={() => formik.handleSubmit()}
            >
              Submit
            </button>
          </div>
        }
      >
        <p className=" text-left text-xs italic pb-2 text-red-500">
          You can only modify section name. if you need to have it in other year
          level, please create a new one.
        </p>
        <div className="flex gap-2 flex-col">
          {generateInput({
            isHorizontal: true,
            required: true,
            id: "year_level",
            label: "Year Level",
            onChange: formik.handleChange,
            value: formik.values.year_level,
            error: formik.errors.year_level,
            touched: formik.touched.year_level,
            placeholder: "Year Level",
            inputType: "select",
            selectValues: [
              ...year_level.map(({ value, title }) => ({
                text: title,
                value,
              })),
            ],
          })}
          {generateInput({
            isHorizontal: true,
            required: true,
            id: "section_name",
            label: "Section name :",
            onChange: formik.handleChange,
            value: formik.values.section_name,
            error: formik.errors.section_name,
            touched: formik.touched.section_name,
            placeholder: "Section name",
            // className: "w-1/3",
          })}
        </div>
      </Modal>
    </>
  );
};
export default AddEditModal;
