import React from "react";
import { FaSyncAlt, FaUserAltSlash } from "react-icons/fa";
import { FiArrowLeft, FiArrowRight, FiSearch } from "react-icons/fi";
import Card, { CardFooter, CardHeader } from "../../../../components/Card";
import Status from "../../../../components/Status";
import Tooltip from "../../../../components/Tooltip";
import useDashboardRouter from "../../../../hooks/useDashboardRouter";
import LegendCard from "./Components/LegendCard";
import { column, mock_data } from "./helper";

const Employees: React.FC = ({}) => {
  const { pushRoute } = useDashboardRouter();
  const filterCard = (
    <Card
      className="w-5/6"
      header={<CardHeader title="Filter" />}
      footer={
        <CardFooter
          left={
            <div className="flex gap-2">
              <button
                className="btn btn-sm btn-info"
                onClick={() =>
                  pushRoute({
                    title: "Add new student",
                    route: "employees:add",
                  })
                }
              >
                Add employee
              </button>

              <button className="btn btn-sm btn-error" disabled={true}>
                Deactivate
              </button>
            </div>
          }
          right={
            <div className="flex gap-2">
              <button className="btn btn-sm btn-link" type={"reset"}>
                Reset
              </button>
              <button className="btn btn-sm btn-success" type={"submit"}>
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
              className="input input-bordered input-sm min-w-[300px]"
            />
          </label>
        </div>
        <div className=" w-fit">
          <div className="form-control max-w-xs bg">
            <select className="select select-bordered min-w-[250px] select-sm">
              <option selected>Select Status</option>
              <option>Activated Accounts</option>
              <option>Deactivated Accounts</option>
            </select>
          </div>
        </div>
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
              ({ email, id, mobile_number, name, status }, idx) => (
                <tr key={idx}>
                  <td>
                    <input type="checkbox" className="checkbox checkbox-xs" />
                  </td>
                  <td>{id}</td>
                  <td>{name}</td>
                  <td>{mobile_number}</td>
                  <td>{email}</td>
                  <td>
                    <Status color={status ? "green" : "grey"} />
                  </td>
                  <td>
                    <div className="flex gap-2 place-content-center">
                      <Tooltip text="Reset Password" direction="top">
                        <button className="btn btn-xs btn-success ">
                          <FaSyncAlt size="12" />
                        </button>
                      </Tooltip>
                      <Tooltip text="Deactivate Account" direction="left">
                        <button className="btn btn-xs btn-error ">
                          <FaUserAltSlash size="12" />
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
export default Employees;
