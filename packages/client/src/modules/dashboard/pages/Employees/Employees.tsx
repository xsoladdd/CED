import { useQuery } from "@apollo/client";
import React, { useRef } from "react";
import { FaSyncAlt, FaUserAltSlash } from "react-icons/fa";
import { FiArrowLeft, FiArrowRight, FiSearch } from "react-icons/fi";
import Card, { CardFooter, CardHeader } from "../../../../components/Card";
import Status from "../../../../components/Status";
import Tooltip from "../../../../components/Tooltip";
import WarningModal from "../../../../components/WarningModal";
import { GetEmployeesQueryDocument } from "../../../../graphQL/generated/graphql";
import useDashboardRouter from "../../../../hooks/useDashboardRouter";
import { usePagination } from "../../../../hooks/usePagination";
import useToggle from "../../../../hooks/useToggle";
import useStore from "../../../../store/useStore";
import LegendCard from "./Components/LegendCard";
import { column, generateRoleTitle } from "./helper";

const Employees: React.FC = ({}) => {
  const { pushRoute } = useDashboardRouter();

  const selectRef = useRef<HTMLSelectElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const { status: modalStatus, toggle: toggleModalStatus } = useToggle(false);

  const { handleNext, handleBack, itemsPerPage, page, pageOffset } =
    usePagination();
  const { refetch, data, loading, error } = useQuery(
    GetEmployeesQueryDocument,
    {
      variables: {
        limit: itemsPerPage,
        offset: pageOffset,
        search: searchRef.current?.value,
        filter: {
          status:
            selectRef.current?.value === ""
              ? undefined
              : parseInt(selectRef.current?.value as string),
        },
      },
    }
  );

  const {
    globalVars: { roles },
  } = useStore();

  const filterCard = (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        refetch({
          limit: itemsPerPage,
          offset: pageOffset,
          search: searchRef.current?.value,
          filter: {
            status:
              selectRef.current?.value === ""
                ? undefined
                : parseInt(selectRef.current?.value as string),
          },
        });
      }}
      onReset={(e) => {
        e.preventDefault();
        if (selectRef.current?.value) {
          selectRef.current.value = "";
        }
        if (searchRef.current?.value) {
          searchRef.current.value = "";
        }
        refetch({
          limit: itemsPerPage,
          offset: pageOffset,
          search: searchRef.current?.value,
          filter: {
            status:
              selectRef.current?.value === ""
                ? undefined
                : parseInt(selectRef.current?.value as string),
          },
        });
      }}
      className="w-5/6"
    >
      <Card
        className="w-full"
        header={<CardHeader title="Filter" />}
        footer={
          <CardFooter
            left={
              <div className="flex gap-2">
                <button
                  className="btn btn-sm btn-info"
                  onClick={() =>
                    pushRoute({
                      title: "Add new employee",
                      route: "employees:add",
                    })
                  }
                >
                  Add employee
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
                placeholder="Search for ID or name"
                className="input input-bordered input-sm min-w-[300px]"
                ref={searchRef}
              />
            </label>
          </div>
          <div className=" w-fit">
            <div className="form-control max-w-xs bg">
              <select
                className="select select-bordered min-w-[250px] select-sm"
                ref={selectRef}
              >
                <option value="">Select Status</option>
                <option value={1}>Activated Accounts</option>
                <option value={0}>Deactivated Accounts</option>
              </select>
            </div>
          </div>
        </div>
      </Card>
    </form>
  );

  const table_body =
    data?.getEmployees?.length !== 0 &&
    data?.getEmployees?.map((props, idx) => (
      <>
        <tr key={idx}>
          <td>{props?.employee_id}</td>
          <td>{`${props?.profile?.first_name} ${props?.profile?.middle_name} ${props?.profile?.last_name}`}</td>
          <td>{props?.partial_password}</td>
          <td>{generateRoleTitle(props?.role as "SA" | "RT" | "BD", roles)}</td>
          <td>
            <Status color={props?.status ? "green" : "grey"} />
          </td>
          <td>
            <div className="flex gap-2 place-content-center">
              <Tooltip text="Reset Password" direction="top">
                <button className="btn btn-xs btn-success ">
                  <FaSyncAlt size="12" />
                </button>
              </Tooltip>
              <Tooltip text="Deactivate Account" direction="left">
                <button
                  className="btn btn-xs btn-error "
                  onClick={() => toggleModalStatus()}
                >
                  <FaUserAltSlash size="12" />
                </button>
              </Tooltip>
            </div>
          </td>
        </tr>
      </>
    ));

  return (
    <>
      <WarningModal
        status={modalStatus}
        handleClose={() => toggleModalStatus()}
        handleProceed={() => {
          toggleModalStatus();
          console.log("DEACT ACCOUNT");
        }}
      >
        {`Changes won't be save. are you sure you want to cancel?`}
      </WarningModal>
      <div className="flex flex-col gap-5">
        <div className="flex gap-5 ">
          {filterCard}
          <LegendCard />
        </div>
        <Card className="w-full">
          <div className="w-full flex justify-end mb-[20px]">
            <div className="flex gap-3 place-items-center">
              <span>
                <FiArrowLeft size="15" onClick={() => handleBack()} />
              </span>
              <span className="text-sm">Page {page} </span>
              <span>
                <FiArrowRight
                  size="15"
                  onClick={() => handleNext(data?.getEmployees?.length)}
                />
              </span>
            </div>
          </div>
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
                {loading ? "loading" : table_body}
                {error && "Something went wrong fetching the table"}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </>
  );
};
export default Employees;
