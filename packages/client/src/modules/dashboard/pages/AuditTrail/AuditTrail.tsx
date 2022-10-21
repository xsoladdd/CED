import React from "react";
import { FiHome } from "react-icons/fi";

const AuditTrail: React.FC = ({}) => {
  return (
    <>
      <ol className="flex gap-2 ">
        <li className="">
          <FiHome />
        </li>
        <span>/ </span>
        <li className="">
          <FiHome />
        </li>

        <h1>hr</h1>
        <span>/ </span>
        <li className="">
          <FiHome />
        </li>
        <span>/ </span>
        <li className="">
          <FiHome />
        </li>
      </ol>
    </>
  );
};
export default AuditTrail;
