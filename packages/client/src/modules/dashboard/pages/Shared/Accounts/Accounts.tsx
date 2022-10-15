import React from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiList,
  FiPlus,
  FiTrash,
} from "react-icons/fi";
import useDashboardRouter from "../../../../../hooks/useDashboardRouter";
import Button from "../../../../../ui/Button";
import Card from "../../../../../ui/Card";
import Table from "../../../../../ui/Table";
import Tooltip from "../../../../../ui/Tooltip";
import FilterCard from "./Components/FilterCard";
import { dummyAccountsData } from "./dummyData";

const AccountsAccess: React.FC = ({}) => {
  const { pushRoute } = useDashboardRouter();
  const dummyButtonTd = (name: string) => (
    <td>
      <div className="flex justify-end gap-2">
        <Tooltip text="View Details">
          <Button
            size="xs"
            color="primary"
            onClick={() => pushRoute({ title: name, route: "accounts:info" })}
          >
            <FiPlus size="15" />
          </Button>
        </Tooltip>

        <Tooltip text="Manage Access">
          <Button
            size="xs"
            color="secondary"
            onClick={() => pushRoute({ title: name, route: "accounts:access" })}
          >
            <FiList size="15" />
          </Button>
        </Tooltip>

        <Tooltip text="Delete Account">
          <Button size="xs" color="error">
            <FiTrash size="15" />
          </Button>
        </Tooltip>
      </div>
    </td>
  );

  const columns = [
    { id: 1, name: "" },
    { id: 2, name: "Name" },
    { id: 3, name: "Email" },
    { id: 4, name: "Mobile Number" },
    { id: 5, name: "" },
  ];

  return (
    <div className="flex gap-5 flex-col">
      <FilterCard />
      <Card bordered={false} className="">
        <div className="overflow-x-auto">
          <Table columns={columns} isZebra>
            {dummyAccountsData.map(({ email, mobileNumber, name }, idx) => (
              <tr key={idx}>
                <th>{idx + 1}</th>
                <td>{name}</td>
                <td>{email}</td>
                <td>{mobileNumber}</td>
                {dummyButtonTd(name)}
              </tr>
            ))}
          </Table>

          {/* <table className="table table-compact w-full z-10">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile Number</th>
                <th className="w-[5%]"></th>
              </tr>
            </thead>
            <tbody>
              {dummyAccountsData.map(({ email, mobileNumber, name }, idx) => (
                <tr key={idx}>
                  <th>{idx + 1}</th>
                  <td>{name}</td>
                  <td>{email}</td>
                  <td>{mobileNumber}</td>
                  {dummyButtonTd(name)}
                </tr>
              ))}
            </tbody>
          </table> */}
        </div>
        <div className=" px-6 pt-4 flex justify-between">
          <div className=""> </div>
          <div className="flex gap-2 place-content-center">
            <div className="btn-group">
              <button className="btn btn-sm btn-ghost">
                <FiArrowLeft />
              </button>
              <span className="text-[12px] my-auto px-[10px]">
                Page 1 out of 24
              </span>
              <button className="btn btn-sm btn-ghost">
                <FiArrowRight />
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
export default AccountsAccess;
