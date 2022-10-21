import React from "react";
import { joinClass } from "../../utils/joinClass";

interface IStatusProps {
  color?: "red" | "blue" | "green" | "grey";
}

const Status: React.FC<IStatusProps> = ({ color = "green" }) => {
  let colorClass = "";
  switch (color) {
    case "blue":
      colorClass = "bg-blue-500";
      break;
    case "grey":
      colorClass = "bg-slate-500";
      break;
    case "red":
      colorClass = "bg-red-500";
      break;
    default:
      colorClass = "bg-green-500";
      break;
  }

  return (
    <>
      <div
        className={joinClass("badge badge-xs  border-transparent", colorClass)}
      ></div>
    </>
  );
};
export default Status;
