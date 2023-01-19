import { useLazyQuery } from "@apollo/client";
import { FormikProps } from "formik";
import React, { useEffect, useState } from "react";
import { FiCornerDownRight, FiLoader, FiSearch } from "react-icons/fi";
import TableLoading from "../../../../../../../components/Table/Loading";
import Tooltip from "../../../../../../../components/Tooltip";
import {
  GetStudentToEnrollListDocument,
  Student,
} from "../../../../../../../graphQL/generated/graphql";
import useDashboardRouter from "../../../../../../../hooks/useDashboardRouter";
import useDebounce from "../../../../../../../hooks/useDebounce";
import useStore from "../../../../../../../store/useStore";
import { IEnrollmentForm } from "../types";
interface StudentSearchProps {
  changeIndex: (idx: number) => void;
  formik: FormikProps<IEnrollmentForm>;
}

const StudentSearch: React.FC<StudentSearchProps> = ({
  formik,
  changeIndex,
}) => {
  const {
    globalVars: { school_year },
  } = useStore();
  const { pushRoute } = useDashboardRouter();
  const [fetchLoading, setFetchLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  // const searchRef = useRef<HTMLInputElement>(null);
  const [getStudentToEnrollList, { data }] = useLazyQuery(
    GetStudentToEnrollListDocument
  );
  const debouncedKeyword: string | undefined = useDebounce<string | undefined>(
    searchKeyword,
    500
  );
  // Effect for API call
  useEffect(
    () => {
      if (debouncedKeyword && searchKeyword.length >= 3) {
        setFetchLoading(true);
        getStudentToEnrollList({
          variables: {
            search: searchKeyword,
          },
          onCompleted: () => {
            // console.log(value);
            setFetchLoading(false);
          },
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [debouncedKeyword] // Only call effect if debounced search term changes
  );

  const tableData = data?.getStudentToEnrollList?.map((untypedRet, idx) => {
    const ret = untypedRet as Student;
    const mostRecentEnrollmentRecord =
      ret.enrollment_records && ret.enrollment_records.length !== 0
        ? ret.enrollment_records[ret.enrollment_records.length - 1]
        : undefined;
    const previousYearLevel =
      typeof mostRecentEnrollmentRecord !== "undefined"
        ? mostRecentEnrollmentRecord?.grade_level_id
        : "N/A";
    const SY = school_year;
    const filteredEnrollmentYearLevel =
      ret.enrollment_records && ret.enrollment_records.length !== 0
        ? ret.enrollment_records.filter((val) => val?.SY === SY)
        : [];
    const isEnrolled: boolean = filteredEnrollmentYearLevel.length !== 0;

    return (
      <tr key={idx} className="text-center">
        <td>{ret.LRN}</td>
        <td>{`${ret.first_name} ${ret.middle_name} ${ret.last_name}`}</td>
        <td>{ret.email}</td>
        <td>{previousYearLevel}</td>
        <td>
          {isEnrolled && "Enrolled"}
          {!isEnrolled && "Not-Enrolled"}
        </td>
        <td>
          <Tooltip text="Select student">
            <button
              className="btn btn-xs btn-info"
              disabled={isEnrolled}
              onClick={() => {
                formik.setFieldValue("student_id", ret.id);
                formik.setFieldValue("student", ret);
                changeIndex(1);
              }}
            >
              <FiCornerDownRight />
            </button>
          </Tooltip>
        </td>
      </tr>
    );
  });

  return (
    <div className="flex gap-5 flex-col">
      <div className="form-control w-1/2">
        <label className="input-group input-group-sm">
          <span className="search-identifier">
            {fetchLoading ? (
              <FiLoader className="animate-spin" />
            ) : (
              <FiSearch />
            )}
          </span>
          <input
            type="search"
            placeholder="LRN, name or email"
            className="input input-bordered input-sm w-full"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </label>
      </div>
      <table className="table table-compact ">
        <thead>
          <tr className="text-center">
            <td>LRN</td>
            <td>Name</td>
            <td>Email</td>
            <td>Previous Year Level</td>
            <td>Enrolled Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {!data && <TableLoading> Search student to continue</TableLoading>}
          {data?.getStudentToEnrollList?.length === 0 && (
            <TableLoading>
              No student found. Click{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() =>
                  pushRoute({
                    title: "Add new student",
                    route: "students:add-stepper",
                  })
                }
              >
                here
              </span>{" "}
              to create a new one.
            </TableLoading>
          )}
          {tableData}
        </tbody>
      </table>
    </div>
  );
};
export default StudentSearch;
