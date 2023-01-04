import { useLazyQuery, useMutation } from "@apollo/client";
import { format } from "date-fns";
import React, { useRef } from "react";
import { FaSyncAlt, FaUserAlt, FaUserAltSlash } from "react-icons/fa";
import {
  FiArrowLeft,
  FiArrowRight,
  FiRefreshCcw,
  FiSearch,
} from "react-icons/fi";
import Card, { CardFooter, CardHeader } from "../../../../components/Card";
import Status from "../../../../components/Status";
import TableLoading from "../../../../components/Table/Loading";
import Tooltip from "../../../../components/Tooltip";
import WarningModal from "../../../../components/WarningModal";
import {
  Employee,
  GetEmployeesDocument,
  ResetEmployeePasswordDocument,
} from "../../../../graphQL/generated/graphql";
import useDashboardRouter from "../../../../hooks/useDashboardRouter";
import useToggle from "../../../../hooks/useToggle";
import useStore from "../../../../store/useStore";
import { exportExcel } from "../../../../utils/exportToExcel";
import { joinClass } from "../../../../utils/joinClass";
import LegendCard from "./Components/LegendCard";
import { column, generateRoleTitle } from "./helper";
import { useEmployee } from "./useEmployee";
import _ from "lodash";

const Employees: React.FC = ({}) => {
  const { pushRoute } = useDashboardRouter();
  const { status: modalStatus, toggle: toggleModalStatus } = useToggle(false);
  const { status: resetPasswordStatus, toggle: toggleResetPasswordStatus } =
    useToggle(false);

  const selectRef = useRef<HTMLSelectElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const newPassword = "password2023";

  const employeeRef = useRef<{ employee_id?: string; status?: number | null }>({
    employee_id: undefined,
    status: undefined,
  });

  const {
    getEmployeeQuery: { data, loading, error, refetch },
    handleRefetch,
    pagination: { handleBack, handleNext, page, itemsPerPage, pageOffset },
    enableAccountMutation: [enableAccount, { loading: enableEmployeeLoading }],
    disableAccountMutation: [
      disableAccount,
      { loading: disableEmployeeLoading },
    ],
  } = useEmployee();

  const pageCount = Math.ceil(
    (data?.getEmployees?.length as number) / itemsPerPage
  );
  const {
    globalVars: { roles },
  } = useStore();

  const [getLazyEmployeesDocument, { loading: exportLoading }] = useLazyQuery(
    GetEmployeesDocument,
    {}
  );

  const [resetEmployeePassword] = useMutation(ResetEmployeePasswordDocument);

  const handleResetPassword = () => {
    console.log(employeeRef.current);

    resetEmployeePassword({
      variables: {
        employeeId: employeeRef.current.employee_id as string,
        password: newPassword,
      },
      onCompleted: () => toggleResetPasswordStatus(),
      onError: (err) => console.error(err),
    });
  };

  const handleExcelExport = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    getLazyEmployeesDocument({
      onCompleted: ({ getEmployees }) => {
        const timeStamp = format(new Date(), "ddMMhhmmss");
        if (getEmployees && getEmployees.employees) {
          exportExcel(
            [
              ...getEmployees.employees.map((props) => {
                const structuredData = props as Employee;
                const dataStructured = {
                  "Employee ID": structuredData.employee_id,
                  Role: generateRoleTitle(
                    structuredData?.role as "SA" | "RT" | "BD",
                    roles
                  ),
                  Name: `${structuredData.profile?.first_name} ${structuredData.profile?.middle_name} ${structuredData.profile?.last_name}`,
                  Email: structuredData.status ? "Activated" : "Deactivated",
                };

                const trimmedData = _.omitBy(dataStructured, _.isNil);
                return trimmedData;
              }),
            ],
            `enrolled-list-${timeStamp}`
          );
        }
      },
    });
  };

  const filterCard = (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // resetPagination();
        if (
          searchRef.current?.value !== "" ||
          selectRef.current?.value !== ""
        ) {
          handleRefetch({
            search: searchRef.current?.value,
            status:
              selectRef.current?.value === ""
                ? undefined
                : parseInt(selectRef.current?.value as string),
          });
        }
      }}
      onReset={(e) => {
        e.preventDefault();
        if (
          searchRef.current?.value !== "" ||
          selectRef.current?.value !== ""
        ) {
          if (selectRef.current?.value) {
            selectRef.current.value = "";
          }
          if (searchRef.current?.value) {
            searchRef.current.value = "";
          }
          handleRefetch({
            search: searchRef.current?.value,
            status:
              selectRef.current?.value === ""
                ? undefined
                : parseInt(selectRef.current?.value as string),
          });
        }
      }}
      className="w-5/6"
    >
      <Card
        className="w-full"
        header={<CardHeader title="Filter" />}
        footer={
          <CardFooter
            right={
              <div className="flex gap-2">
                <button
                  className="btn btn-sm btn-link"
                  type={"reset"}
                  disabled={exportLoading}
                >
                  Reset
                </button>
                <button
                  className="btn btn-sm btn-success"
                  type={"submit"}
                  disabled={exportLoading}
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

  const tableData =
    data?.getEmployees?.employees &&
    data?.getEmployees?.employees.length !== 0 &&
    (data?.getEmployees?.employees as Array<Employee>).map((props, idx) => (
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
                <button
                  className="btn btn-xs btn-success "
                  onClick={() => {
                    employeeRef.current = {
                      employee_id: props?.employee_id,
                      status: props?.status,
                    };
                    toggleResetPasswordStatus();
                  }}
                  disabled={exportLoading}
                >
                  <FaSyncAlt size="12" />
                </button>
              </Tooltip>
              <Tooltip
                text={props?.status ? "Disable Account" : "Enable Account"}
                direction="left"
              >
                <button
                  className={joinClass(
                    "btn btn-xs",
                    props?.status ? `btn-error` : `btn-info`
                  )}
                  disabled={
                    enableEmployeeLoading ||
                    disableEmployeeLoading ||
                    exportLoading
                  }
                  onClick={() => {
                    employeeRef.current = {
                      employee_id: props?.employee_id,
                      status: props?.status,
                    };
                    toggleModalStatus();
                  }}
                >
                  {props?.status ? (
                    <FaUserAltSlash size="12" />
                  ) : (
                    <FaUserAlt size="12" />
                  )}
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
          const { employee_id, status } = employeeRef.current;
          if (employee_id) {
            if (status === 1) {
              // console.log(`disableAccount`);
              disableAccount({ variables: { employeeId: employee_id } });
            }
            if (status === 0) {
              // console.log(`enableAccount`);
              enableAccount({ variables: { employeeId: employee_id } });
            }
          }
        }}
      >
        {`Changes won't be save. are you sure you want to cancel?`}
      </WarningModal>

      <WarningModal
        status={resetPasswordStatus}
        handleClose={() => toggleResetPasswordStatus()}
        handleProceed={() => {
          handleResetPassword();
        }}
        color="yellow"
      >
        {`Are you sure that you want to reset password? User password will be "${newPassword}"`}
      </WarningModal>
      <div className="flex flex-col gap-5">
        <div className="flex gap-5 ">
          {filterCard}
          <LegendCard />
        </div>
        <Card className="w-full">
          <div className="w-full flex justify-between mb-[20px]">
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
            <div className="flex gap-3 place-items-center">
              <button
                className="btn btn-sm btn-success"
                disabled={exportLoading}
                onClick={handleExcelExport}
                type="button"
              >
                Export List
              </button>
              <Tooltip text="Refresh" direction="top">
                <button
                  className="btn btn-sm btn-ghost flex gap-2"
                  disabled={exportLoading}
                  onClick={() => {
                    refetch({
                      limit: itemsPerPage,
                      offset: pageOffset,
                      search: "",
                      filter: {},
                    });
                  }}
                  type="button"
                >
                  <FiRefreshCcw />
                </button>
              </Tooltip>
              <span>
                <FiArrowLeft
                  size="15"
                  onClick={() => handleBack()}
                  className="cursor-pointer"
                />
              </span>
              <span className="text-sm">
                Page {page} out of {pageCount}
              </span>
              <span>
                <FiArrowRight
                  size="15"
                  onClick={() => handleNext(pageCount)}
                  className="cursor-pointer"
                />
              </span>
            </div>
          </div>
          <div className="overflow-x-auto min-h-[200px]">
            <table className="table w-full table-compact table-zebra">
              <thead>
                <tr className="text-center">
                  {column.map((name, idx) => (
                    <th key={idx}>{name}</th>
                  ))}
                </tr>
              </thead>

              <tbody className="text-center">
                {loading ? <TableLoading>loading</TableLoading> : tableData}
                {data?.getEmployees?.length === 0 ? (
                  <TableLoading>No data found</TableLoading>
                ) : null}
                {error && (
                  <TableLoading>
                    Something went wrong fetching the table
                  </TableLoading>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </>
  );
};
export default Employees;
