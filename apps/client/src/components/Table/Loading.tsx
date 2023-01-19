import React from "react";

const TableLoading: React.FC = ({ children }) => {
  return (
    <>
      <tr>
        <td colSpan={20} className="text-center uppercase">
          {children}
        </td>
      </tr>
    </>
  );
};
export default TableLoading;
