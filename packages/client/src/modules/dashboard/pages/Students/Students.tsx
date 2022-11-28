import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { FiArrowLeft, FiArrowRight, FiSearch } from "react-icons/fi";
import Card, { CardHeader } from "../../../../components/Card";
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
import { formatDateReadable } from "../../../../utils/formatDateReadable";
import LegendCard from "./Components/LegendCard";
import { column } from "./helper";

const Students: React.FC = ({}) => {
  const { pushRoute } = useDashboardRouter();

  const {
    student: { setSelectedRecord, resetSelectedStudent },
  } = useStore();

  useEffect(() => {
    resetSelectedStudent();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { handleBack, handleNext, page, itemsPerPage, pageOffset } =
    usePagination();

  const { data, loading, error } = useQuery(GetStudentsDocument, {
    variables: {
      limit: itemsPerPage,
      offset: pageOffset,
    },
  });
  const pageCount = Math.ceil(
    (data?.getStudents?.length as number) / itemsPerPage
  );
  const studentData = data?.getStudents?.students as Array<Student>;

  const filterCard = (
    <Card className="w-5/6" header={<CardHeader title="Filter" />}>
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
                  className="btn btn-xs btn-success"
                  onClick={() => {
                    setSelectedRecord(props.id as string, "student-record");
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
            <div className="flex gap-3 place-items-center">
              <span>
                <FiArrowLeft size="15" onClick={() => handleBack()} />
              </span>
              <span className="text-sm">
                Page {page} out of {pageCount}{" "}
              </span>
              <span>
                <FiArrowRight size="15" onClick={() => handleNext(pageCount)} />
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
                {/* {data?.getEmployees?.length === 0 ? (
              <TableLoading>No data found</TableLoading>
            ) : null} */}
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
