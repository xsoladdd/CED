import { useLazyQuery, useQuery } from "@apollo/client";
import format from "date-fns/format";
import React, { useRef } from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiRefreshCcw,
  FiSearch,
} from "react-icons/fi";
import Card, { CardFooter, CardHeader } from "../../../../components/Card";
import TableLoading from "../../../../components/Table/Loading";
import {
  AuditTrail,
  GetAuditTrailsDocument,
} from "../../../../graphQL/generated/graphql";
import { usePagination } from "../../../../hooks/usePagination";
import useStore from "../../../../store/useStore";
import { exportExcel } from "../../../../utils/exportToExcel";
import { formatDateReadable } from "../../../../utils/formatDateReadable";
import { column } from "./helper";
import _ from "lodash";
import Tooltip from "../../../../components/Tooltip";

const AuditTrail: React.FC = ({}) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);

  const { handleBack, handleNext, page, itemsPerPage, pageOffset } =
    usePagination();

  const {
    globalVars: { audit_trail_type },
  } = useStore();
  const { data, loading, error, refetch } = useQuery(GetAuditTrailsDocument, {
    variables: {
      limit: itemsPerPage,
      offset: pageOffset,
      search:
        typeof searchRef.current?.value === "undefined"
          ? ""
          : searchRef.current?.value,
      filter: {
        // type: typeRef.current?.value,
        type:
          typeRef.current?.value === "" ||
          typeof typeRef.current?.value === "undefined"
            ? ""
            : (typeRef.current?.value as string),
      },
    },
    notifyOnNetworkStatusChange: true,
  });

  const [getAuditTrails, { loading: exportLoading }] = useLazyQuery(
    GetAuditTrailsDocument,
    {}
  );

  const handleExcelExport = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    getAuditTrails({
      variables: {
        limit: 1000,
        offset: 0,
        search:
          typeof searchRef.current?.value === "undefined"
            ? ""
            : searchRef.current?.value,
        filter: {
          // type: typeRef.current?.value,
          type:
            typeRef.current?.value === "" ||
            typeof typeRef.current?.value === "undefined"
              ? ""
              : (typeRef.current?.value as string),
        },
      },
      onCompleted: (props) => {
        const timeStamp = format(new Date(), "ddMMhhmmss");
        if (
          props.getAuditTrails &&
          props.getAuditTrails &&
          props.getAuditTrails.audit_trail
        ) {
          exportExcel(
            [
              ...props.getAuditTrails.audit_trail.map((val) => {
                const trail = val as AuditTrail;
                const dataStructured = {
                  TID: trail.id,
                  // Name: trail?.employee.profile?.first_name,
                  Name: `${trail?.employee.profile?.first_name} ${trail?.employee.profile?.middle_name} ${trail?.employee.profile?.last_name}`,
                  Description: trail.description,
                  Timestamp: formatDateReadable(
                    trail?.timestamp,
                    "MMMM dd yyyy - hh:mm aa"
                  ),
                  "Action Type": trail.action_type,
                };

                const trimmedData = _.omitBy(dataStructured, _.isNil);
                return trimmedData;
              }),
            ],
            `Audit-Trail-List-${timeStamp}`
          );
        }
      },
    });
  };

  const pageCount = Math.ceil(
    (data?.getAuditTrails?.length as number) / itemsPerPage
  );

  const handleRefetch = () =>
    refetch({
      limit: itemsPerPage,
      offset: pageOffset,
      search: searchRef.current?.value,
      filter: {
        type:
          typeRef.current?.value === "" ||
          typeof typeRef.current?.value === "undefined"
            ? ""
            : (typeRef.current?.value as string),
      },
    });

  const filterCard = (
    <form
      action=""
      onSubmit={(e) => {
        e.preventDefault();
        if (typeRef.current?.value !== "" || searchRef.current?.value !== "") {
          handleRefetch();
        }
      }}
      onReset={(e) => {
        e.preventDefault();
        if (typeRef.current?.value !== "" || searchRef.current?.value !== "") {
          if (typeRef.current?.value) {
            typeRef.current.value = "";
          }
          if (searchRef.current?.value) {
            searchRef.current.value = "";
          }
          handleRefetch();
        }
      }}
      className="w-full"
    >
      <Card
        className=""
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
        <div className="flex place-items-end gap-2">
          <div className="">
            <label className="input-group input-group-sm">
              <span className="search-identifier">
                <FiSearch />
              </span>
              <input
                type="input"
                placeholder="Employee ID"
                className="input input-bordered input-sm min-w-[300px]"
                ref={searchRef}
              />
            </label>
          </div>

          <div className=" w-fit">
            <div className="form-control max-w-xs bg">
              <select
                className="select select-bordered min-w-[250px] select-sm"
                ref={typeRef}
              >
                <option value="">Select Action Type</option>
                {audit_trail_type.map((title, idx) => (
                  <option value={title} key={idx}>
                    {title.replaceAll("_", " ")}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </Card>
    </form>
  );

  const audit_trail = data?.getAuditTrails?.audit_trail as Array<AuditTrail>;

  const tableData =
    audit_trail &&
    audit_trail.length !== 0 &&
    audit_trail.map((props, idx) => {
      return (
        <tr key={idx}>
          <td>{props?.id}</td>
          <td>{props?.action_type.replace("_", " ")}</td>
          <td>{props?.description}</td>
          <td>
            {formatDateReadable(props?.timestamp, "MMMM dd yyyy - hh:mm aa")}
          </td>
          <td>
            {`${props?.employee.profile?.first_name}
                ${props?.employee.profile?.last_name}`}
          </td>
          <td>{`${props?.employee.employee_id}`}</td>
        </tr>
      );
    });

  const tableActions = (
    <div className="w-full flex justify-between mb-[20px]">
      <div className="flex gap-2"></div>
      <div className="flex gap-3 place-items-center">
        <button
          className="btn btn-sm btn-success"
          onClick={handleExcelExport}
          disabled={exportLoading}
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
                search:
                  typeof searchRef.current?.value === "undefined"
                    ? ""
                    : searchRef.current?.value,
                filter: {
                  // type: typeRef.current?.value,
                  type:
                    typeRef.current?.value === "" ||
                    typeof typeRef.current?.value === "undefined"
                      ? ""
                      : (typeRef.current?.value as string),
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
  );
  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="flex gap-5 ">{filterCard}</div>
        <Card className="w-full">
          {tableActions}
          <div className="overflow-x-auto min-h-[300px]">
            <table className="table w-full table-compact table-zebra ">
              <thead>
                <tr className="text-center">
                  {column.map((name, idx) => (
                    <th key={idx}>{name}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-center">
                {loading ? <TableLoading>loading</TableLoading> : tableData}
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
export default AuditTrail;
