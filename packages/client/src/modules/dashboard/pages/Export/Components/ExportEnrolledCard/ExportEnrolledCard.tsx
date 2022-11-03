import { format } from "date-fns";
import React, { useState } from "react";
import Card, {
  CardFooter,
  CardHeader,
} from "../../../../../../components/Card";
import useStore from "../../../../../../store/useStore";
import { exportExcel } from "../../../../../../utils/exportToExcel";
import { checkAllCheckboxData, defaultCheckboxData, dummyData } from "./helper";
import _ from "lodash";

const ExportEnrolledCard: React.FC = ({}) => {
  const [checkboxState, setCheckboxState] = useState({
    ...defaultCheckboxData,
  });

  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const {
    globalVars: { year_level },
  } = useStore();

  const header = <CardHeader title="Enrolled student export" />;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const timeStamp = format(new Date(), "ddMMhhmmss");
    exportExcel(
      [
        ...dummyData.map(({ student, ...rest }) => {
          const dataStructured = {
            whole_name: checkboxState.whole_name
              ? `${student.first_name} ${student.middle_name} ${student.last_name}`
              : undefined,
            first_name: checkboxState.first_name
              ? student.first_name
              : undefined,
            middle_name: checkboxState.middle_name
              ? student.middle_name
              : undefined,
            last_name: checkboxState.last_name ? student.last_name : undefined,
            LRN: checkboxState.LRN ? student.LRN : undefined,
            student_id: checkboxState.SID ? rest.SID : undefined,
            email: checkboxState.email ? student.email : undefined,
            mobile_number: checkboxState.mobile_number
              ? student.mobile_number
              : undefined,
            birthday: checkboxState.birthday ? student.birthday : undefined,
            grade_level: checkboxState.year ? rest.grade_level : undefined,
            section: checkboxState.section ? rest.section : undefined,
            status: checkboxState.status ? rest.status : undefined,
          };

          const trimmedData = _.omitBy(dataStructured, _.isNil);

          return trimmedData;
        }),
      ],
      `enrolled-list-${timeStamp}`
    );
  };

  const generateCheckbox = (id: string, value: boolean, label: string) => (
    <>
      <div className="form-control">
        <label className="label cursor-pointer flex place-content-start gap-2">
          <input
            type="checkbox"
            className="checkbox checkbox-sm"
            checked={value}
            id={id}
            onChange={(e) => {
              const { checked, id: targetID } = e.target;
              setCheckboxState((old) => ({
                ...old,
                [targetID]: checked,
              }));
            }}
          />
          <span className="label-text">{label}</span>
        </label>
      </div>
    </>
  );

  const footer = (
    <CardFooter
      right={
        <>
          <div className="flex gap-2">
            <button className="btn btn-sm btn-link" type={"reset"}>
              Reset
            </button>
            <button className="btn btn-sm btn-success" type={"submit"}>
              Export
            </button>
          </div>
        </>
      }
    />
  );

  const sectionArray = year_level.filter(({ value }) => value === selectedYear);
  const mainFilter = (
    <div className="flex gap-2 flex-col">
      <div className="flex gap-5">
        <div className="form-control max-w-xs bg">
          <select
            className="select select-bordered min-w-[250px] select-sm"
            onChange={(e) => {
              setSelectedYear(e.target.value);
              setSelectedSection("");
            }}
            value={selectedYear}
          >
            <option value="">Select Year</option>
            {year_level.map(({ title, value }, idx) => (
              <option key={idx} value={value}>
                {title}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control max-w-xs bg">
          <select
            className="select select-bordered min-w-[250px] select-sm"
            disabled={!selectedYear}
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
          >
            <option value="">Select Section</option>
            {sectionArray.length !== 0 &&
              sectionArray[0].sections?.map(({ title, value }, idx) => (
                <option key={idx} value={value}>
                  {title}
                </option>
              ))}
          </select>
        </div>
        <div className="form-control max-w-xs bg">
          <select
            className="select select-bordered min-w-[250px] select-sm"
            // disabled={!selectedYear}
            // value={selectedSection}
            // onChange={(e) => setSelectedSection(e.target.value)}
          >
            <option value="">Select Status</option>
            <option value="true">Enrolled</option>
            <option value="false">Not Enrolled</option>
          </select>
        </div>
      </div>
      <div className="w-1/3">
        <label className="label cursor-pointer flex place-content-start gap-2">
          <input
            type="checkbox"
            className="checkbox checkbox-sm"
            checked={Object.values(checkboxState).every(
              (value) => value === true
            )}
            onChange={() => {
              const isAllNotselected = Object.values(checkboxState).every(
                (value) => value === true
              );
              if (!isAllNotselected) {
                setCheckboxState({
                  ...checkAllCheckboxData,
                });
              } else {
                setCheckboxState({
                  ...defaultCheckboxData,
                });
              }
            }}
          />
          <span className="label-text font-bold">Select All</span>
        </label>
      </div>
    </div>
  );

  return (
    <>
      <form
        className="w-full "
        onSubmit={handleSubmit}
        onReset={(e) => {
          e.preventDefault();
          setSelectedSection("");
          setSelectedYear("");
          setCheckboxState({ ...defaultCheckboxData });
        }}
      >
        <Card bordered={false} header={header} footer={footer}>
          {mainFilter}

          <div className="w-full xl:w-1/3">
            <div className="grid grid-cols-2 gap-1">
              {generateCheckbox(
                "whole_name",
                checkboxState.whole_name,
                "Whole name"
              )}
              {generateCheckbox("SID", checkboxState.SID, "Student number")}
              {generateCheckbox(
                "first_name",
                checkboxState.first_name,
                "First name"
              )}
              {generateCheckbox("LRN", checkboxState.LRN, "LRN")}
              {generateCheckbox(
                "middle_name",
                checkboxState.middle_name,
                "Middle name"
              )}
              {generateCheckbox("email", checkboxState.email, "Email")}
              {generateCheckbox(
                "last_name",
                checkboxState.last_name,
                "Last name"
              )}
              {generateCheckbox(
                "mobile_number",
                checkboxState.mobile_number,
                "Contact number"
              )}
              {generateCheckbox("section", checkboxState.section, "Section")}
              {generateCheckbox("year", checkboxState.year, "Year level")}
              {generateCheckbox("birthday", checkboxState.birthday, "Birthday")}
              {generateCheckbox("status", checkboxState.status, "Status")}
            </div>
          </div>
        </Card>
      </form>
    </>
  );
};
export default ExportEnrolledCard;
