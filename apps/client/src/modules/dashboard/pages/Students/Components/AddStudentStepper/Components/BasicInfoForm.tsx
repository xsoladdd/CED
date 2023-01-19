import { FormikProps } from "formik";
import React from "react";
import LRNInput from "../../../../../../../components/LRNInput/LRNInput";
import { IselectedStudentState } from "../../../../../../../store/useStore/slices/student/types";
import { joinClass } from "../../../../../../../utils/joinClass";
import { generateInput } from "../../../../Shared/Components/StudentDetails/Components/helper";

const BasicInfoForm: React.FC<{ formik: FormikProps<IselectedStudentState> }> =
  ({ formik }) => {
    return (
      <div>
        <div className="flex gap-3">
          <div className={joinClass(`form-control w-1/2`)}>
            <LRNInput
              LRN={formik.values.basicInfo.LRN}
              error={formik.errors.basicInfo?.LRN}
              formikHandleChange={formik.handleChange}
              id={`basicInfo.LRN`}
              setFieldError={formik.setFieldError}
            />
            {/* <label className="label">
              <span className="label-text ">
                <RequiredIndicator />
                LRN :
              </span>
            </label>
            <div className="flex gap-2 place-items-center">
              <input
                placeholder={"##############"}
                className={joinClass(
                  `input input-bordered  input-sm w-full`,
                  formik.errors.basicInfo?.LRN ? `input-error` : "",
                  data?.checkUniqueLRN ? "input-success" : "",
                  data?.checkUniqueLRN === false ? "input-error" : ""
                )}
                value={formik.values.basicInfo.LRN}
                onChange={formik.handleChange}
                // onChange={handleLRNValidation}
                id={`basicInfo.LRN`}
                name={`basicInfo.LRN`}
              />
              {data?.checkUniqueLRN === false && (
                <Tooltip text="LRN is already registered to a student">
                  <AiFillWarning className="text-red-500" />
                </Tooltip>
              )}
              {data?.checkUniqueLRN && <FiCheck className="text-green-500" />}
              {fetchLoading && <FiLoader className="animate-spin" />}
            </div>
            <Text variant="error" className="pt-2">
              {formik.errors.basicInfo?.LRN}
            </Text> */}
          </div>
        </div>
        <div className="flex gap-3">
          {generateInput({
            id: "basicInfo.first_name",
            label: "First name :",
            onChange: formik.handleChange,
            value: formik.values.basicInfo.first_name,
            error: formik.errors.basicInfo?.first_name,
            touched: formik.touched.basicInfo?.first_name,
            placeholder: "First name",
            required: true,
            className: "w-1/3",
          })}
          {generateInput({
            id: "basicInfo.middle_name",
            label: "Middle name :",
            onChange: formik.handleChange,
            value: formik.values.basicInfo.middle_name,
            error: formik.errors.basicInfo?.middle_name,
            touched: formik.touched.basicInfo?.middle_name,
            placeholder: "Middle name",
            className: "w-1/3",
          })}
          {generateInput({
            required: true,
            id: "basicInfo.last_name",
            label: "Last name :",
            onChange: formik.handleChange,
            value: formik.values.basicInfo.last_name,
            error: formik.errors.basicInfo?.last_name,
            touched: formik.touched.basicInfo?.last_name,
            placeholder: "Middle name",
            className: "w-1/3",
          })}
        </div>
        <div className="flex gap-3">
          {generateInput({
            required: true,
            id: "basicInfo.gender",
            label: "Gender :",
            onChange: formik.handleChange,
            value: formik.values.basicInfo.gender,
            error: formik.errors.basicInfo?.gender,
            touched: formik.touched.basicInfo?.gender,
            placeholder: "Gender",
            inputType: "select",
            selectValues: [
              { text: "Male", value: "M" },
              { text: "Female", value: "F" },
            ],
            className: "w-1/3",
          })}
          {generateInput({
            required: true,
            id: "basicInfo.birthday",
            label: "Birthday :",
            inputType: "date",
            onDateChange: (date) => {
              if (date instanceof Date) {
                formik.setFieldValue("basicInfo.birthday", date);
              }
            },
            value: formik.values.basicInfo.birthday,
            error: formik.errors.basicInfo?.birthday,
            touched: !!formik.touched.basicInfo?.birthday,
            placeholder: "Birthday",
            className: "w-1/3",
          })}
        </div>
        <div className="flex gap-3 ">
          {generateInput({
            type: "email",
            required: true,
            id: "basicInfo.email",
            label: "Email :",
            onChange: formik.handleChange,
            value: formik.values.basicInfo.email,
            error: formik.errors.basicInfo?.email,
            touched: formik.touched.basicInfo?.email,
            placeholder: "Email",
            className: "w-1/3 ",
          })}
          {generateInput({
            id: "basicInfo.contact_number",
            required: true,
            label: "Mobile Number :",
            onChange: formik.handleChange,
            value: formik.values.basicInfo.contact_number,
            error: formik.errors.basicInfo?.contact_number,
            touched: formik.touched.basicInfo?.contact_number,
            placeholder: "Mobile Number",
            className: "w-1/3 ",
          })}
          <h1 className="w-1/3"></h1>
        </div>
      </div>
    );
  };
export default BasicInfoForm;
