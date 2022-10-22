import React from "react";
import { joinClass } from "../../utils/joinClass";
import Modal from "../Modal";
import { IModalProps } from "./types";

const WarningModal: React.FC<IModalProps> = ({
  children,
  status = false,
  color = "red",
  handleClose,
  handleProceed,
}) => {
  let colorClass = "";

  switch (color) {
    case "blue":
      colorClass = "btn-info";
      break;

    case "red":
      colorClass = "btn-error";
      break;

    default:
      colorClass = "btn-success";
      break;
  }
  return (
    <>
      <Modal
        title="Are you sure?"
        status={status}
        handleClose={handleClose}
        size="lg"
        footer={
          <div className=" flex gap-2 justify-end">
            <button
              className="btn btn-link btn-sm"
              onClick={() => {
                if (handleClose) handleClose();
              }}
            >
              Cancel
            </button>
            <button
              className={joinClass(`btn btn-error btn-sm`, colorClass)}
              onClick={() => {
                if (handleProceed) handleProceed();
              }}
            >
              Proceed
            </button>
          </div>
        }
      >
        <div className="text-left">{children}</div>
      </Modal>
    </>
  );
};
export default WarningModal;
