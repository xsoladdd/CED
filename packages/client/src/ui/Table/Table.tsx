import React from "react";
import { joinClass } from "../../utils/joinClass";
import Loading from "../../components/Loading";
import { ITableProps } from "./types";

const Table: React.FC<ITableProps> = ({
  columns,
  isLoading = false,
  hasFooter,
  isCompact = true,
  isZebra = false,
  isEmpty = false,
  children,
}) => {
  const twClass = `table w-full`;
  const tableBody = <tbody>{children}</tbody>;

  const loading = (
    <>
      <tbody>
        <tr>
          <td colSpan={columns.length}>
            <div className="flex place-items-center place-content-center py-3">
              <Loading size="md" />
            </div>
          </td>
        </tr>
      </tbody>
    </>
  );

  const emptyData = (
    <>
      <tbody>
        <tr>
          <td colSpan={columns.length}>
            <div className="flex place-items-center place-content-center py-3">
              Table appears to be empty
            </div>
          </td>
        </tr>
      </tbody>
    </>
  );
  return (
    <div className="overflow-x-auto">
      <table
        className={joinClass(
          twClass,
          isZebra ? "table-zebra" : "",
          isCompact ? "table-compact" : "table-normal"
        )}
      >
        <thead>
          <tr>
            {columns.map(({ name, id }) => (
              <th key={id}>{name}</th>
            ))}
          </tr>
        </thead>
        {isLoading && loading}
        {isEmpty ? emptyData : tableBody}

        {hasFooter && (
          <tfoot>
            <tr>
              {columns.map(({ name, id }) => (
                <th key={id}>{name}</th>
              ))}
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
};

export default Table;
