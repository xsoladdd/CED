import React, { useEffect } from "react";
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
import { column, mock_data } from "./helper";

const EnrolledList: React.FC = ({}) => {
  const { pushRoute } = useDashboardRouter();
  const { status: toggleStatus, toggle } = useToggle(false);

  const filterCard = (
    <Card
      className="w-5/6"
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
            placeholder="Search for ID, Name and Email"
            className="input input-bordered input-sm min-w-[400px]"
          />
        </label>
      </div>
    </Card>
  );
  const {
    student: {
      setSelectedAddressInfo,
      resetSelectedStudent,
      setSelectedBasicInfo,
      // setSelectedGuardianInfo,
    },
  } = useStore();

  useEffect(() => {
    resetSelectedStudent();

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const actionButtons = ({ LRN }: { LRN: string | number }) => (
    <div className="flex gap-2 place-content-center">
      <Tooltip text="Green/Pink card" direction="top">
        <button
          className="btn btn-xs btn-info "
          onClick={() => {
            pushRoute({
              title: `Student Registration - ${LRN}`,
              route: "enrolledList:regCard",
            });
          }}
        >
          <FaRegAddressCard size="12" />
        </button>
      </Tooltip>
      <Tooltip text="View/Edit student" direction="top">
        <button
          className="btn btn-xs btn-warning"
          onClick={() => {
            setSelectedBasicInfo({
              birthday: "12-24-1997",
              email: "aforeman0@paginegialle.it",
              gender: "M",
              middleName: "Efford",
              firstName: "John",
              lastName: "Doe",
              LRN: "20140000123432",
              mobileNumber: "09334213245",
            });
            // qwer Dummy data
            setSelectedAddressInfo({
              barangay: "Molino VII",
              city: "Bacoor City",
              no: "4102",
              province: "Cavite",
              region: "Region IV-A (CALABARZON)",
              street: "4102",
              subdiv: "San Lorenzo Ruiz ",
              zipcode: "4102",
            });
            pushRoute({
              title: `Student Info - ${LRN}`,
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
                    <input type="checkbox" className="checkbox checkbox-xs" />
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
                  <td>{actionButtons({ LRN: "123412341234" })}</td>
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
