import React, { useEffect, useState } from "react";
import { FaEdit, FaRegAddressCard, FaTrash } from "react-icons/fa";
import { FiArrowLeft, FiArrowRight, FiSearch } from "react-icons/fi";
import Card, { CardFooter, CardHeader } from "../../../../components/Card";
import Status from "../../../../components/Status";
import Tooltip from "../../../../components/Tooltip";
import WarningModal from "../../../../components/WarningModal";
import useDashboardRouter from "../../../../hooks/useDashboardRouter";
import useToggle from "../../../../hooks/useToggle";
import useStore from "../../../../store/useStore";
import LegendCard from "./Components/LegendCard";
import RegCardModal from "./Components/RegCardModal";
import { column, generateSectionYear } from "./helper";

const EnrolledList: React.FC = ({}) => {
  const { pushRoute } = useDashboardRouter();
  const { status: toggleStatus, toggle } = useToggle(false);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const { status: regFormModalStatus, toggle: toggleRegFormModalStatus } =
    useToggle(false);

  const {
    student: {
      resetSelectedStudent,
      enrolledStudentList,
      setSelectedRecord,
      // setSelectedGuardianInfo,
    },
    globalVars: { year_level },
  } = useStore();

  useEffect(() => {
    resetSelectedStudent();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sectionArray = year_level.filter(({ value }) => value === selectedYear);

  const filterCard = (
    <Card
      className="w-full"
      header={<CardHeader title="Filter" />}
      footer={
        <CardFooter
          left={
            <div className="flex gap-2">
              <button
                className="btn btn-sm btn-primary"
                onClick={() =>
                  pushRoute({
                    title: "Add new student",
                    route: "enrolledList:add",
                  })
                }
              >
                Enroll student
              </button>
              <button className="btn btn-sm btn-error" disabled={true}>
                Drop Students
              </button>
            </div>
          }
          right={
            <div className="flex gap-2">
              <button
                className="btn btn-sm btn-link"
                type={"button"}
                onClick={() => {
                  setSelectedSection("");
                  setSelectedYear("");
                }}
              >
                Reset
              </button>
              <button
                className="btn btn-sm btn-success"
                type={"button"}
                disabled={!selectedYear}
                onClick={() => {
                  // qwer run query
                  console.log(selectedYear, selectedSection);
                  console.log(`execute query with parameters `);
                }}
              >
                Filter
              </button>
            </div>
          }
        />
      }
    >
      <div className="flex gap-2">
        <div className="">
          <label className="input-group input-group-sm">
            <span className="search-identifier">
              <FiSearch />
            </span>
            <input
              type="search"
              placeholder="Search for ID, Name and Email"
              className="input input-bordered input-sm min-w-[250px]"
            />
          </label>
        </div>
        <div className=" w-fit">
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
        </div>
        <div className=" w-fit">
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
        </div>
      </div>
    </Card>
  );

  const actionButtons = ({ id }: { id: string }) => (
    <div className="flex gap-2 place-content-center">
      <Tooltip text="Registration card" direction="top">
        <button
          className="btn btn-xs btn-info "
          onClick={() => {
            setSelectedRecord(id, "reg-card");
            toggleRegFormModalStatus();
          }}
        >
          <FaRegAddressCard size="12" />
        </button>
      </Tooltip>
      <Tooltip text="View/Edit student" direction="top">
        <button
          className="btn btn-xs btn-success"
          onClick={() => {
            setSelectedRecord(id, "enrollment-record");
            pushRoute({
              title: `Student Info `,
              route: "enrolledList:studentDetails",
            });
          }}
        >
          <FaEdit size="12" />
        </button>
      </Tooltip>
      <Tooltip text="Drop Student" direction="top">
        <button className="btn btn-xs btn-error " onClick={() => toggle()}>
          <FaTrash size="12" />
        </button>
      </Tooltip>
    </div>
  );

  const tableCard = (
    <Card className="w-full">
      <div className="overflow-x-auto">
        <table className="table w-full table-compact table-zebra">
          <thead>
            <tr className="text-center">
              {column.map((name, idx) => (
                <th key={idx}>{name}</th>
              ))}
            </tr>
          </thead>
          <tbody className="text-center">
            {enrolledStudentList.map(
              (
                {
                  SID,
                  grade_level,
                  id,
                  section,
                  status,
                  student: {
                    first_name,
                    middle_name,
                    last_name,
                    email,
                    mobile_number,
                  },
                },
                idx
              ) => {
                const { section: sectionString, year } = generateSectionYear(
                  grade_level,
                  section,
                  year_level
                );
                return (
                  <tr key={idx}>
                    <td>
                      <input type="checkbox" className="checkbox checkbox-xs" />
                    </td>
                    <td>{SID}</td>
                    <td>{`${first_name} ${middle_name} ${last_name}`}</td>
                    {/* <td>{birthday}</td> */}
                    <td>{email}</td>
                    <td>{mobile_number}</td>
                    <td>{`${year} - ${sectionString}`}</td>
                    <td>
                      <Status color={status === "E" ? "green" : "grey"} />
                    </td>
                    <td>{actionButtons({ id })}</td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>

      <div className="w-full flex justify-end mt-[20px]">
        <div className="flex gap-3 place-items-center">
          <span>
            <FiArrowLeft size="15" />
          </span>
          <span className="text-sm">Page 3 out of 24</span>
          <span>
            <FiArrowRight size="15" />
          </span>
        </div>
      </div>
    </Card>
  );

  return (
    <>
      <RegCardModal
        status={regFormModalStatus}
        handleClose={() => toggleRegFormModalStatus()}
        handleProceed={() => toggleRegFormModalStatus()}
      />
      <WarningModal
        status={toggleStatus}
        handleClose={() => toggle()}
        handleProceed={() => toggle()}
      >
        Are you sure that you want to delete?
      </WarningModal>
      <div className="flex flex-col gap-5">
        <div className="flex gap-5 ">
          {filterCard}
          <LegendCard />
        </div>
        {tableCard}
      </div>
    </>
  );
};
export default EnrolledList;
