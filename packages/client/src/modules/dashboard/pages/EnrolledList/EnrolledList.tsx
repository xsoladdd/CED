import React from "react";
import { FaEdit, FaRegAddressCard, FaTrash } from "react-icons/fa";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import Card, { CardFooter, CardHeader } from "../../../../components/Card";
import Status from "../../../../components/Status";
import Tooltip from "../../../../components/Tooltip";
import useDashboardRouter from "../../../../hooks/useDashboardRouter";
import LegendCard from "./Components/LegendCard";
import { column, mock_data } from "./helper";

const EnrolledList: React.FC = ({}) => {
  const { pushRoute } = useDashboardRouter();
  const filterCard = (
    <Card
      className="w-5/6"
      header={<CardHeader title="Filter" />}
      footer={
        <CardFooter
          left={
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
          }
          right={
            <button className="btn btn-sm btn-error" disabled={true}>
              Deactivate
            </button>
          }
        />
      }
    ></Card>
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
                {
                  StudentID,
                  birthday,
                  contactNumber,
                  email,
                  name,
                  sectionYear,
                  status,
                },
                idx
              ) => (
                <tr key={idx}>
                  <td>
                    <input
                      type="checkbox"
                      checked
                      className="checkbox checkbox-xs"
                    />
                  </td>
                  <td>{StudentID}</td>
                  <td>{name}</td>
                  <td>{birthday}</td>
                  <td>{email}</td>
                  <td>{contactNumber}</td>
                  <td>{sectionYear}</td>
                  <td>
                    <Status color={status} />
                  </td>
                  <td>
                    <div className="flex gap-2 place-content-center">
                      <Tooltip text="Green/Pink card" direction="top">
                        <button className="btn btn-xs btn-info ">
                          <FaRegAddressCard size="12" />
                        </button>
                      </Tooltip>
                      <Tooltip text="View/Edit student" direction="top">
                        <button className="btn btn-xs btn-warning ">
                          <FaEdit size="12" />
                        </button>
                      </Tooltip>
                      <Tooltip text="Drop Student" direction="top">
                        <button className="btn btn-xs btn-error ">
                          <FaTrash size="12" />
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
export default EnrolledList;
