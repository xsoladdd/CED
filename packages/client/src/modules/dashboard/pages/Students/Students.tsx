import React from "react";
import { FaEdit } from "react-icons/fa";
import { FiArrowLeft, FiArrowRight, FiSearch } from "react-icons/fi";
import Card, { CardFooter, CardHeader } from "../../../../components/Card";
import Status from "../../../../components/Status";
import Tooltip from "../../../../components/Tooltip";
import useDashboardRouter from "../../../../hooks/useDashboardRouter";
import LegendCard from "./Components/LegendCard";
import { column, mock_data } from "./helper";

const Students: React.FC = ({}) => {
  const { pushRoute } = useDashboardRouter();

  const filterCard = (
    <Card
      className="w-5/6"
      header={<CardHeader title="Filter" />}
      footer={
        <CardFooter
          left={
            <button
              className="btn btn-sm btn-info"
              onClick={() =>
                pushRoute({ title: "Add new student", route: "students:add" })
              }
            >
              Add student
            </button>
          }
        />
      }
    >
      <div className="flex gap-2">
        <label className="input-group input-group-sm">
          <span>
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
            {mock_data.map(
              (
                { StudentID, birthday, contactNumber, email, name, status },
                idx
              ) => (
                <tr key={idx}>
                  <td>{StudentID}</td>
                  <td>{name}</td>
                  <td>{birthday}</td>
                  <td>{contactNumber}</td>
                  <td>{email}</td>
                  <td>
                    <Status color={status} />
                  </td>
                  <td>
                    <div className="flex gap-2 place-content-center">
                      <Tooltip text="View/Edit student" direction="top">
                        <button className="btn btn-xs btn-info ">
                          <FaEdit size="12" />
                        </button>
                      </Tooltip>
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
