import { useLazyQuery, useQuery } from "@apollo/client";
import { format } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiExternalLink,
  FiRefreshCcw,
  FiSearch,
} from "react-icons/fi";
import Card, { CardFooter, CardHeader } from "../../../../components/Card";
import Status from "../../../../components/Status";
import TableLoading from "../../../../components/Table/Loading";
import Tooltip from "../../../../components/Tooltip";
import {
  EnrolledRecord,
  GetEnrolledArchiveListDocument,
  GetSchoolYearsDocument,
  Student,
} from "../../../../graphQL/generated/graphql";
import useDashboardRouter from "../../../../hooks/useDashboardRouter";
import { usePagination } from "../../../../hooks/usePagination";
import useStore from "../../../../store/useStore";
import { exportExcel } from "../../../../utils/exportToExcel";
import { generateSectionYear } from "../EnrolledList/helper";
import LegendCard from "./Components/LegendCard";
import { column } from "./helper";
import _ from "lodash";

const Archive: React.FC = ({}) => {
  const { pushRoute } = useDashboardRouter();
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const {
    student: {
      resetSelectedStudent,
      setSelectedRecord,
      setCheckStudentEditStatus,
      // setSelectedGuardianInfo,
    },
    globalVars: { year_level },
  } = useStore();

  const searchRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLSelectElement>(null);
  const schoolYearRef = useRef<HTMLSelectElement>(null);

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

  const { data, loading, error, refetch } = useQuery(
    GetEnrolledArchiveListDocument,
    {
      variables: {
        limit: itemsPerPage,
        offset: pageOffset,
        filter: {},
      },
      notifyOnNetworkStatusChange: true,
    }
  );

  const { data: schoolYearArray } = useQuery(GetSchoolYearsDocument);

  const pageCount = Math.ceil(
    (data?.getEnrolledArchiveList?.length as number) / itemsPerPage
  );

  const enrolledRecords = data?.getEnrolledArchiveList
    ?.enrolledRecords as Array<EnrolledRecord>;

  const sectionArray = year_level.filter(({ value }) => value === selectedYear);

  const [getLazyEnrolledArchiveList] = useLazyQuery(
    GetEnrolledArchiveListDocument
  );

  const handleExcelExport = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    getLazyEnrolledArchiveList({
      variables: {
        limit: 1000,
        offset: 0,
        filter: {
          search: searchRef.current?.value,
          section: selectedSection ? selectedSection : undefined,
          status: statusRef.current?.value,
          year_level: selectedYear ? selectedYear : undefined,
          school_year: schoolYearRef.current?.value,
        },
      },
      onCompleted: ({ getEnrolledArchiveList }) => {
        const timeStamp = format(new Date(), "ddMMhhmmss");
        if (getEnrolledArchiveList && getEnrolledArchiveList.enrolledRecords) {
          exportExcel(
            [
              ...getEnrolledArchiveList.enrolledRecords.map((props) => {
                const structuredData = props as EnrolledRecord;
                const { section, year } = generateSectionYear(
                  structuredData.grade_level_id,
                  structuredData.section_id,
                  year_level
                );
                const dataStructured = {
                  "School Number": structuredData.SID,
                  Name: `${structuredData.student?.first_name} ${structuredData.student?.middle_name} ${structuredData.student?.last_name}`,
                  Email: structuredData.student?.email,
                  "Contact Number": structuredData.student?.contact_number,
                  "Section - Year": `${year} - ${section}`,
                  Status: structuredData.status,
                  "School Year": structuredData.SY,
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
    <Card
      className="w-full xl:w-10/12"
      header={<CardHeader title="Filter" />}
      footer={
        <CardFooter
          right={
            <div className="flex gap-2">
              <button
                className="btn btn-sm btn-link"
                type={"button"}
                onClick={() => {
                  setSelectedSection("");
                  setSelectedYear("");
                  if (
                    searchRef.current &&
                    statusRef.current &&
                    schoolYearRef.current
                  ) {
                    resetPagination();
                    searchRef.current.value = "";
                    statusRef.current.value = "";
                    schoolYearRef.current.value = "";
                    refetch({
                      limit: itemsPerPage,
                      offset: pageOffset,
                      filter: {
                        school_year: undefined,
                        search: undefined,
                        section: undefined,
                        status: undefined,
                        year_level: undefined,
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
                // disabled={!selectedYear}
                onClick={() => {
                  if (
                    searchRef.current?.value ||
                    selectedYear ||
                    statusRef.current?.value ||
                    schoolYearRef.current?.value
                  ) {
                    // Reset Pagination
                    resetPagination();
                    refetch({
                      limit: itemsPerPage,
                      offset: pageOffset,
                      filter: {
                        search: searchRef.current?.value,
                        section: selectedSection ? selectedSection : undefined,
                        status: statusRef.current?.value,
                        year_level: selectedYear ? selectedYear : undefined,
                        school_year: schoolYearRef.current?.value,
                      },
                    });
                  }
                }}
              >
                Filter
              </button>
            </div>
          }
        />
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
        <label className="input-group w-full">
          <span className="search-identifier">
            <FiSearch />
          </span>
          <input
            type="search"
            ref={searchRef}
            placeholder="Search for ID, Name and Email"
            className="input input-bordered input-sm w-full"
          />
        </label>
        <div className="w-full">
          <div className="form-control">
            <select
              className="select select-bordered select-sm"
              onChange={(e) => {
                setSelectedYear(e.target.value);
                setSelectedSection("");
              }}
              value={selectedYear}
            >
              <option value="">Select Year</option>
              {year_level.map(({ title, value }, idx) => (
                <option key={idx} value={value}>
                  {title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="w-full">
          <div className="form-control">
            <select
              className="select select-bordered select-sm"
              disabled={!selectedYear}
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
            >
              <option value="">Select Section</option>
              {sectionArray.length !== 0 &&
                sectionArray[0].sections?.map(({ title, id }, idx) => (
                  <option key={idx} value={id}>
                    {title}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="w-full">
          <div className="form-control ">
            <select
              className="select select-bordered select-sm"
              ref={statusRef}
            >
              <option value="">All Status</option>
              <option value={"np"}>Not Paid</option>
              <option value={"pp"}>Partially Paid</option>
              <option value={"fp"}>Fully Paid</option>
              <option value={"d"}>Dropped</option>
            </select>
          </div>
        </div>
        <div className="w-full">
          <div className="form-control ">
            <select
              className="select select-bordered select-sm"
              ref={schoolYearRef}
            >
              <option value="">All School Year</option>
              {schoolYearArray &&
                schoolYearArray.getSchoolYears?.map((props, idx) => (
                  <option value={props?.name} key={idx}>
                    {props?.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>
    </Card>
  );

  const actionButtons = ({ id }: { id: string; status: string }) => (
    <div className="flex gap-2 place-content-center">
      <Tooltip text="View Enrollment Record" direction="left">
        <button
          className="btn btn-xs btn-success"
          onClick={() => {
            setSelectedRecord(id, "enrollment-record");

            setCheckStudentEditStatus(false);
            pushRoute({
              title: `Student Info `,
              route: "enrolledList:studentDetails",
            });
          }}
        >
          <FiExternalLink size="12" />
        </button>
      </Tooltip>
    </div>
  );

  const tableData =
    enrolledRecords &&
    enrolledRecords.map(
      ({ grade_level_id, section_id, id, status, student, SID, SY }, idx) => {
        const { first_name, middle_name, last_name, contact_number, email } =
          student as Student;
        const { section: sectionString, year } = generateSectionYear(
          grade_level_id,
          section_id,
          year_level
        );
        return (
          <tr key={idx}>
            <td>{SID}</td>
            <td>{`${first_name} ${middle_name} ${last_name}`}</td>
            {/* <td>{birthday}</td> */}
            <td>{email}</td>
            <td>{contact_number}</td>
            <td>{`${year} - ${sectionString}`}</td>
            <td>{SY}</td>
            <td>
              {status?.toUpperCase() === "NP" && <Status color={"red"} />}
              {status?.toUpperCase() === "FP" && <Status color={"green"} />}
              {status?.toUpperCase() === "PP" && <Status color={"yellow"} />}
              {status?.toUpperCase() === "D" && <Status color={"grey"} />}
            </td>
            <td>
              {actionButtons({
                id: id as string,
                status: status ? status : "",
              })}
            </td>
          </tr>
        );
      }
    );

  return (
    <>
      <div className="flex flex-col gap-[10px]">
        <div className="flex gap-[10px] flex-col xl:flex-row">
          {filterCard}
          <LegendCard />
        </div>

        <Card className="w-full">
          <div className="w-full flex justify-between mb-[20px]">
            <div className="flex gap-2">
              <button
                className="btn btn-sm btn-success"
                onClick={handleExcelExport}
                type="button"
              >
                Export List
              </button>
              <button
                className="btn btn-sm btn-ghost flex gap-2"
                onClick={() => {
                  refetch({
                    limit: itemsPerPage,
                    offset: pageOffset,
                    filter: {
                      search: searchRef.current?.value,
                      section: selectedSection ? selectedSection : undefined,
                      status: statusRef.current?.value,
                      year_level: selectedYear ? selectedYear : undefined,
                      school_year: schoolYearRef.current?.value,
                    },
                  });
                }}
                type="button"
              >
                <FiRefreshCcw /> Refresh
              </button>
            </div>
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
                {data?.getEnrolledArchiveList?.length === 0 ? (
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
export default Archive;
