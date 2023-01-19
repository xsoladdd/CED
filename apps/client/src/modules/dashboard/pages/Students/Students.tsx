import { useLazyQuery, useQuery } from "@apollo/client";
import { format } from "date-fns";
import React, { useEffect, useRef } from "react";
import { FaEdit } from "react-icons/fa";
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
import {
  GetStudentsDocument,
  Student,
} from "../../../../graphQL/generated/graphql";
import useDashboardRouter from "../../../../hooks/useDashboardRouter";
import { usePagination } from "../../../../hooks/usePagination";
import useStore from "../../../../store/useStore";
import { exportExcel } from "../../../../utils/exportToExcel";
import { formatDateReadable } from "../../../../utils/formatDateReadable";
import LegendCard from "./Components/LegendCard";
import { column } from "./helper";
import _ from "lodash";

const Students: React.FC = ({}) => {
  const { pushRoute } = useDashboardRouter();

  const {
    student: {
      setSelectedRecord,
      resetSelectedStudent,
      setCheckStudentEditStatus,
    },
  } = useStore();

  useEffect(() => {
    resetSelectedStudent();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    handleBack,
    handleNext,
    page,
    itemsPerPage,
    pageOffset,
    resetPagination,
  } = usePagination();

  const searchRef = useRef<HTMLInputElement>(null);

  const { data, loading, error, refetch } = useQuery(GetStudentsDocument, {
    variables: {
      limit: itemsPerPage,
      offset: pageOffset,
      filter: {},
    },
    notifyOnNetworkStatusChange: true,
  });
  const pageCount = Math.ceil(
    (data?.getStudents?.length as number) / itemsPerPage
  );
  const studentData = data?.getStudents?.students as Array<Student>;

  const [getLazyGetStudents, { loading: exportLoading }] = useLazyQuery(
    GetStudentsDocument,
    {
      variables: {
        limit: 1000,
        offset: 0,
        filter: {
          search: searchRef.current?.value,
        },
      },
    }
  );

  const handleExcelExport = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    getLazyGetStudents({
      onCompleted: ({ getStudents }) => {
        const timeStamp = format(new Date(), "ddMMhhmmss");
        if (getStudents && getStudents.students) {
          exportExcel(
            [
              ...getStudents.students.map((props) => {
                const student = props as Student;
                const dataStructured = {
                  LRN: student.LRN,
                  Name: `${student?.first_name} ${student?.middle_name} ${student?.last_name}`,
                  Birthday: student.birthday,
                  Email: student?.email,
                  "Contact Number": student?.contact_number,
                };

                const trimmedData = _.omitBy(dataStructured, _.isNil);
                return trimmedData;
              }),
            ],
            `student-list-${timeStamp}`
          );
        }
      },
    });
  };

  const filterCard = (
    <Card
      className="w-5/6"
      header={<CardHeader title="Filter" />}
      footer={
        <CardFooter
          right={
            <div className="flex gap-2">
              <button
                disabled={exportLoading}
                className="btn btn-sm btn-link"
                type={"button"}
                onClick={() => {
                  if (searchRef.current?.value) {
                    searchRef.current.value = "";
                    refetch({
                      limit: itemsPerPage,
                      offset: pageOffset,
                      filter: {
                        search: searchRef.current?.value,
                      },
                    });
                  }
                }}
              >
                Reset
              </button>
              <button
                className="btn btn-sm btn-success"
                type={"button"}
                disabled={exportLoading}
                onClick={() => {
                  resetPagination();
                  refetch({
                    limit: itemsPerPage,
                    offset: pageOffset,
                    filter: {
                      search: searchRef.current?.value,
                    },
                  });
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
        <label className="input-group input-group-sm">
          <span className="search-identifier">
            <FiSearch />
          </span>
          <input
            type="search"
            placeholder="Search for LRN, Name and Email"
            ref={searchRef}
            className="input input-bordered input-sm min-w-[400px]"
          />
        </label>
      </div>
    </Card>
  );

  const tableData =
    studentData &&
    studentData?.map((props, idx) => (
      <tr key={idx}>
        <td>{props?.LRN}</td>
        <td>{`${props?.first_name} ${
          props?.middle_name ? props?.middle_name : ""
        } ${props?.last_name}`}</td>
        <td>{formatDateReadable(props?.birthday as string)}</td>
        <td>{props?.contact_number}</td>
        <td>{props?.email}</td>
        <td>
          {props?.status === "A" && <Status color={"blue"} />}
          {props?.status === "E" && <Status color={"green"} />}
          {props?.status === "NE" && <Status color={"grey"} />}
        </td>
        <td>
          <div className="flex gap-2 place-content-center">
            {props?.id && (
              <Tooltip text="View/Edit student" direction="top">
                <button
                  disabled={exportLoading}
                  className="btn btn-xs btn-success"
                  onClick={() => {
                    setSelectedRecord(props.id as string, "student-record");
                    setCheckStudentEditStatus(true);
                    pushRoute({
                      title: `Student Info - ${props?.LRN}`,
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
    ));

  return (
    <>
      <div className="flex flex-col gap-[10px]">
        <div className="flex gap-[10px] ">
          {filterCard}
          <LegendCard />
        </div>
        <Card className="w-full">
          <div className="w-full flex justify-between mb-[20px]">
            <div className="flex gap-2">
              <button
                disabled={exportLoading}
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
              <button
                className="btn btn-sm btn-primary"
                disabled={exportLoading}
                onClick={() =>
                  pushRoute({
                    title: "Import students",
                    route: "students:import-students",
                  })
                }
              >
                Import students
              </button>
            </div>
            <div className="flex gap-3 place-items-center">
              <button
                disabled={exportLoading}
                className="btn btn-sm btn-success"
                onClick={handleExcelExport}
                type="button"
              >
                Export List
              </button>
              <Tooltip text="Refresh" direction="top">
                <button
                  disabled={exportLoading}
                  className="btn btn-sm btn-ghost flex gap-2"
                  onClick={() => {
                    refetch({
                      limit: itemsPerPage,
                      offset: pageOffset,
                      filter: {
                        search: searchRef.current?.value,
                      },
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
                Page {page} out of {pageCount}{" "}
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
                {loading ? <TableLoading>loading</TableLoading> : tableData}
                {data?.getStudents?.length === 0 ? (
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
export default Students;
