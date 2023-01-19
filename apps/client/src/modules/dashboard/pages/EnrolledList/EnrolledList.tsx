import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import format from "date-fns/format";
import _ from "lodash";
import React, { useEffect, useRef, useState } from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiDownload,
  FiEdit,
  FiRefreshCcw,
  FiSearch,
  FiTrash,
} from "react-icons/fi";
import Card, { CardFooter, CardHeader } from "../../../../components/Card";
import Status from "../../../../components/Status";
import TableLoading from "../../../../components/Table/Loading";
import Tooltip from "../../../../components/Tooltip";
import WarningModal from "../../../../components/WarningModal";
import {
  DropEnrollmentRecordDocument,
  EnrolledRecord,
  GetEnrolledListDocument,
  Student,
} from "../../../../graphQL/generated/graphql";
import useDashboardRouter from "../../../../hooks/useDashboardRouter";
import { usePagination } from "../../../../hooks/usePagination";
import useToggle from "../../../../hooks/useToggle";
import useStore from "../../../../store/useStore";
import { exportExcel } from "../../../../utils/exportToExcel";
import LegendCard from "./Components/LegendCard";
import RegCardModal from "./Components/RegCardModal";
import { generateSectionYear } from "./helper";

const EnrolledList: React.FC = ({}) => {
  const { pushRoute } = useDashboardRouter();
  const { status: toggleStatus, toggle } = useToggle(false);
  const { status: bulkStatus, toggle: bulkToggle } = useToggle(false);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLSelectElement>(null);
  const [selectedStudent, setSelectedStudent] = useState<
    Array<{ id: string; name: string }>
  >([]);
  const { status: regFormModalStatus, toggle: toggleRegFormModalStatus } =
    useToggle(false);
  // const [deletedId, setDeletedId] = useState("");
  const deletedId = useRef("");
  const {
    student: {
      resetSelectedStudent,
      setSelectedRecord,
      setCheckStudentEditStatus,
      // setSelectedGuardianInfo,
    },
    globalVars: { year_level },
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

  const { data, loading, error, refetch } = useQuery(GetEnrolledListDocument, {
    variables: {
      limit: itemsPerPage,
      offset: pageOffset,
      filter: {},
    },
    notifyOnNetworkStatusChange: true,
  });

  const [dropEnrollmentRecord] = useMutation(DropEnrollmentRecordDocument);

  const pageCount = Math.ceil(
    (data?.getEnrolledList?.length as number) / itemsPerPage
  );

  const enrolledRecords = data?.getEnrolledList
    ?.enrolledRecords as Array<EnrolledRecord>;

  const sectionArray = year_level.filter(({ value }) => value === selectedYear);

  const [getLazyGetEnrolledList, { loading: exportLoading }] = useLazyQuery(
    GetEnrolledListDocument
  );

  const handleExcelExport = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    getLazyGetEnrolledList({
      variables: {
        limit: 1000,
        offset: 0,
        filter: {
          search: searchRef.current?.value,
          section: selectedSection ? selectedSection : undefined,
          status: statusRef.current?.value,
          year_level: selectedYear ? selectedYear : undefined,
        },
      },
      onCompleted: ({ getEnrolledList }) => {
        const timeStamp = format(new Date(), "ddMMhhmmss");
        if (getEnrolledList && getEnrolledList.enrolledRecords) {
          exportExcel(
            [
              ...getEnrolledList.enrolledRecords.map((props) => {
                const structuredData = props as EnrolledRecord;
                const { section, year } = generateSectionYear(
                  structuredData.grade_level_id,
                  structuredData.section_id,
                  year_level
                );
                const dataStructured = {
                  "School ID": structuredData.SID,
                  Name: `${structuredData.student?.first_name} ${structuredData.student?.middle_name} ${structuredData.student?.last_name}`,
                  Email: structuredData.student?.email,
                  "Contact Number": structuredData.student?.contact_number,
                  "Year - Section": `${year} - ${section}`,
                  status: structuredData.status,
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
                disabled={exportLoading}
                onClick={() => {
                  setSelectedSection("");
                  setSelectedYear("");
                  if (searchRef.current && statusRef.current) {
                    resetPagination();
                    searchRef.current.value = "";
                    statusRef.current.value = "";
                    refetch({
                      limit: itemsPerPage,
                      offset: pageOffset,
                      filter: {},
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
                  if (
                    searchRef.current?.value ||
                    selectedYear ||
                    statusRef.current?.value
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
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4  gap-2">
        <label className="input-group w-full">
          <span className="search-identifier">
            <FiSearch />
          </span>
          <input
            type="search"
            ref={searchRef}
            placeholder="Search Name or Email"
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
      </div>
    </Card>
  );

  const actionButtons = ({ id, status }: { id: string; status: string }) => (
    <div className="flex gap-2 place-content-center">
      <Tooltip text="Registration card" direction="top">
        <button
          className="btn btn-xs btn-info "
          disabled={exportLoading}
          onClick={() => {
            setSelectedRecord(id, "reg-card");
            toggleRegFormModalStatus();
          }}
        >
          <FiDownload size="12" />
        </button>
      </Tooltip>
      <Tooltip text="View/Edit student" direction="top">
        <button
          disabled={exportLoading}
          className="btn btn-xs btn-success"
          onClick={() => {
            setSelectedRecord(id, "enrollment-record");
            setCheckStudentEditStatus(true);
            pushRoute({
              title: `Student Info `,
              route: "enrolledList:studentDetails",
            });
          }}
        >
          <FiEdit size="12" />
        </button>
      </Tooltip>
      <Tooltip text="Drop Student" direction="top">
        <button
          disabled={exportLoading || status === "d"}
          className="btn btn-xs btn-error "
          onClick={() => {
            deletedId.current = id;
            toggle();
          }}
        >
          <FiTrash size="12" />
        </button>
      </Tooltip>
    </div>
  );

  const tableData =
    enrolledRecords &&
    enrolledRecords.map(
      ({ grade_level_id, section_id, id, status, student, SID }, idx) => {
        const { first_name, middle_name, last_name, contact_number, email } =
          student as Student;
        const { section: sectionString, year } = generateSectionYear(
          grade_level_id,
          section_id,
          year_level
        );
        return (
          <tr key={idx}>
            <td>
              <input
                type="checkbox"
                className="checkbox checkbox-xs"
                disabled={status === "d"}
                checked={
                  selectedStudent.filter(
                    ({ id: arrID }) => arrID === (id as string)
                  ).length !== 0
                }
                onChange={() => {
                  if (status !== "d") {
                    const selectedID = id as string;
                    if (
                      selectedStudent.filter(
                        ({ id: arrID }) => arrID === selectedID
                      ).length !== 0
                    ) {
                      setSelectedStudent((old) => [
                        ...old.filter(({ id: arrID }) => arrID !== selectedID),
                      ]);
                    } else {
                      setSelectedStudent((old) => [
                        ...old,
                        {
                          id: selectedID,
                          name: `${first_name} ${middle_name} ${last_name}`,
                        },
                      ]);
                    }
                  }
                }}
              />
            </td>
            <td>{SID}</td>
            <td>{`${first_name} ${middle_name} ${last_name}`}</td>
            {/* <td>{birthday}</td> */}
            <td>{email}</td>
            <td className="hidden xl:table-cell">{contact_number}</td>
            <td>{`${year} - ${sectionString}`}</td>
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
      {regFormModalStatus && (
        <RegCardModal
          status={regFormModalStatus}
          handleClose={() => toggleRegFormModalStatus()}
          handleProceed={() => toggleRegFormModalStatus()}
        />
      )}
      {toggleStatus && (
        <WarningModal
          status={toggleStatus}
          handleClose={() => toggle()}
          handleProceed={() => {
            if (deletedId.current) {
              dropEnrollmentRecord({
                variables: { input: [deletedId.current] },
                onCompleted: () => {
                  toggle();
                  deletedId.current = "";
                  setSelectedStudent([]);
                },
              });
            }
          }}
        >
          Are you sure that you want to delete?
        </WarningModal>
      )}
      {bulkStatus && (
        <WarningModal
          status={bulkStatus}
          handleClose={() => bulkToggle()}
          handleProceed={() => {
            if (selectedStudent.length !== 0) {
              dropEnrollmentRecord({
                variables: { input: [...selectedStudent.map(({ id }) => id)] },
                onCompleted: () => {
                  // console.log("success");
                  setSelectedStudent([]);
                  bulkToggle();
                },
              });
            }
          }}
        >
          Are you sure that you want to drop the following record?
          <ul className=" text-sm list-disc pl-6">
            {selectedStudent.map(({ name }, idx) => (
              <li key={idx}>{name}</li>
            ))}
          </ul>
        </WarningModal>
      )}
      <div className="flex flex-col gap-[10px]">
        <div className="flex gap-[10px] flex-col xl:flex-row">
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
                    title: "Add new student",
                    route: "enrolledList:add",
                  })
                }
              >
                Enroll student
              </button>
              <button
                className="btn btn-sm btn-error"
                disabled={selectedStudent.length === 0}
                onClick={() => bulkToggle()}
              >
                Drop Students
              </button>
            </div>
            <div className="flex gap-3 place-items-center">
              <button
                className="btn btn-sm btn-success"
                onClick={handleExcelExport}
                type="button"
              >
                Export List
              </button>
              <Tooltip text="Refresh" direction="top">
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
          <div className="overflow-x-auto ">
            <table className="table w-full table-compact table-zebra table-auto">
              <thead>
                <tr className="text-center">
                  <th className="w-[30px]"></th>
                  <th className="w-[100px]">StudentID</th>
                  <th className="w-[150px]">Full Name</th>
                  <th className="">Email</th>
                  <th className="hidden xl:table-cell">Contact Number</th>
                  <th className="w-[120px] ">Section Year</th>
                  <th className="w-[30px]">Status</th>
                  <th className="w-[120px]">Actions</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {loading ? <TableLoading>loading</TableLoading> : tableData}
                {data?.getEnrolledList?.length === 0 ? (
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
export default EnrolledList;
