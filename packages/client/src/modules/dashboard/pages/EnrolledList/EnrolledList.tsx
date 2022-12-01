import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useRef, useState } from "react";
import { FaEdit, FaRegAddressCard, FaTrash } from "react-icons/fa";
import { FiArrowLeft, FiArrowRight, FiSearch } from "react-icons/fi";
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
import LegendCard from "./Components/LegendCard";
import RegCardModal from "./Components/RegCardModal";
import { column, generateSectionYear } from "./helper";

const EnrolledList: React.FC = ({}) => {
  const { pushRoute } = useDashboardRouter();
  const { status: toggleStatus, toggle } = useToggle(false);
  const { status: bulkStatus, toggle: bulkToggle } = useToggle(false);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
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
      // setSelectedGuardianInfo,
    },
    globalVars: { year_level },
  } = useStore();

  useEffect(() => {
    resetSelectedStudent();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { handleBack, handleNext, page, itemsPerPage, pageOffset } =
    usePagination();

  const { data, loading, error } = useQuery(GetEnrolledListDocument, {
    variables: {
      limit: itemsPerPage,
      offset: pageOffset,
    },
  });

  const [dropEnrollmentRecord] = useMutation(DropEnrollmentRecordDocument);

  const pageCount = Math.ceil(
    (data?.getEnrolledList?.length as number) / itemsPerPage
  );

  const enrolledRecords = data?.getEnrolledList
    ?.enrolledRecords as Array<EnrolledRecord>;

  const sectionArray = year_level.filter(({ value }) => value === selectedYear);

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
                }}
              >
                Reset
              </button>
              <button
                className="btn btn-sm btn-success"
                type={"button"}
                disabled={!selectedYear}
                onClick={() => {
                  // qwer run query
                  console.log(selectedYear, selectedSection);
                  console.log(`execute query with parameters `);
                }}
              >
                Filter
              </button>
            </div>
          }
        />
      }
    >
      <div className="flex flex-col xl:flex-row gap-2">
        <div className="">
          <label className="input-group input-group-sm">
            <span className="search-identifier">
              <FiSearch />
            </span>
            <input
              type="search"
              placeholder="Search for ID, Name and Email"
              className="input input-bordered input-sm min-w-[250px]"
            />
          </label>
        </div>
        <div className=" w-fit">
          <div className="form-control max-w-xs bg">
            <select
              className="select select-bordered min-w-[250px] select-sm"
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
        <div className="w-fit">
          <div className="form-control max-w-xs bg">
            <select
              className="select select-bordered min-w-[250px] select-sm"
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
      </div>
    </Card>
  );

  const actionButtons = ({ id, status }: { id: string; status: string }) => (
    <div className="flex gap-2 place-content-center">
      <Tooltip text="Registration card" direction="top">
        <button
          className="btn btn-xs btn-info "
          onClick={() => {
            setSelectedRecord(id, "reg-card");
            toggleRegFormModalStatus();
          }}
        >
          <FaRegAddressCard size="12" />
        </button>
      </Tooltip>
      <Tooltip text="View/Edit student" direction="top">
        <button
          className="btn btn-xs btn-success"
          onClick={() => {
            setSelectedRecord(id, "enrollment-record");
            pushRoute({
              title: `Student Info `,
              route: "enrolledList:studentDetails",
            });
          }}
        >
          <FaEdit size="12" />
        </button>
      </Tooltip>
      <Tooltip text="Drop Student" direction="top">
        <button
          className="btn btn-xs btn-error "
          onClick={() => {
            deletedId.current = id;
            toggle();
          }}
          disabled={status === "d"}
        >
          <FaTrash size="12" />
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
            <td>{contact_number}</td>
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
                  console.log("success");
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
            <div className="flex gap-5">
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
export default EnrolledList;
