import React, { useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { FiArrowLeft, FiArrowRight, FiSearch } from "react-icons/fi";
import Card, { CardFooter, CardHeader } from "../../../../components/Card";
import Status from "../../../../components/Status";
import Tooltip from "../../../../components/Tooltip";
import useDashboardRouter from "../../../../hooks/useDashboardRouter";
import useStore from "../../../../store/useStore";
import LegendCard from "./Components/LegendCard";
import { column } from "./helper";

const Students: React.FC = ({}) => {
  const { pushRoute } = useDashboardRouter();

  const {
    student: { studentList, setSelectedRecord, resetSelectedStudent },
  } = useStore();

  useEffect(() => {
    resetSelectedStudent();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterCard = (
    <Card
      className="w-5/6"
      header={<CardHeader title="Filter" />}
      footer={
        <CardFooter
          left={
            <>
              <button
                className="btn btn-sm btn-info"
                onClick={() =>
                  pushRoute({
                    title: "Add new student",
                    route: "students:add-stepper",
                  })
                }
              >
                Add student
              </button>
            </>
          }
        />
      }
    >
      <div className="flex gap-2">
        <label className="input-group input-group-sm">
          <span className="search-identifier">
            <FiSearch />
          </span>
          <input
            type="search"
            placeholder="Search for LRN, Name and Email"
            className="input input-bordered input-sm min-w-[400px]"
          />
        </label>
      </div>
    </Card>
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
            {studentList.map(
              (
                {
                  LRN,
                  birthday,
                  email,
                  first_name,
                  id,
                  last_name,
                  middle_name,
                  mobile_number,
                  status,
                },
                idx
              ) => (
                <tr key={idx}>
                  <td>{LRN}</td>
                  <td>{`${first_name} ${middle_name} ${last_name}`}</td>
                  <td>{birthday}</td>
                  <td>{mobile_number}</td>
                  <td>{email}</td>
                  <td>
                    {status === "A" && <Status color={"blue"} />}
                    {status === "E" && <Status color={"green"} />}
                    {status === "NE" && <Status color={"grey"} />}
                  </td>
                  <td>
                    <div className="flex gap-2 place-content-center">
                      {id && (
                        <Tooltip text="View/Edit student" direction="top">
                          <button
                            className="btn btn-xs btn-success"
                            onClick={() => {
                              setSelectedRecord(id, "student-record");
                              pushRoute({
                                title: `Student Info - ${LRN}`,
                                route: "students:view",
                              });
                            }}
                          >
                            <FaEdit size="12" />
                          </button>
                        </Tooltip>
                      )}
                    </div>
                  </td>
                </tr>
              )
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
export default Students;
