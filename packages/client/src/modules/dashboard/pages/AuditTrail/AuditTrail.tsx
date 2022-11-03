import React from "react";
import { FiArrowLeft, FiArrowRight, FiSearch } from "react-icons/fi";
import Card, { CardFooter, CardHeader } from "../../../../components/Card";
import useStore from "../../../../store/useStore";
import { column, mock_data } from "./helper";

const AuditTrail: React.FC = ({}) => {
  const {
    globalVars: { audit_trail_type },
  } = useStore();

  console.log(audit_trail_type);
  const filterCard = (
    <form
      action=""
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className="w-full"
    >
      <Card
        className=" "
        header={<CardHeader title="Filter" />}
        footer={
          <CardFooter
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
        <div className="flex place-items-end gap-2">
          <div className="">
            <label className="input-group input-group-sm">
              <span className="search-identifier">
                <FiSearch />
              </span>
              <input
                type="search"
                placeholder="Employee ID, Employee Name"
                className="input input-bordered input-sm min-w-[300px]"
              />
            </label>
          </div>

          <div className=" w-fit">
            <div className="form-control max-w-xs bg">
              <select className="select select-bordered min-w-[250px] select-sm">
                <option>Select Action Type</option>
                {audit_trail_type.map(({ title, value }, idx) => (
                  <option value={value} key={idx}>
                    {title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </Card>
    </form>
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
              ({ EID, TID, description, name, timeDate, type }, idx) => (
                <tr key={idx}>
                  <td>{TID}</td>
                  <td>{type}</td>
                  <td>{description}</td>
                  <td>{timeDate}</td>
                  <td>{name}</td>
                  <td>{EID}</td>
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
        <div className="flex gap-5 ">{filterCard}</div>
        {tableCard}
      </div>
    </>
  );
};
export default AuditTrail;
