import { useQuery } from "@apollo/client";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { format } from "date-fns";
import React from "react";
import { FiDownload } from "react-icons/fi";
import Modal from "../../../../../../components/Modal";
import {
  EnrolledRecord,
  GetEnrollmentRecordDocument,
} from "../../../../../../graphQL/generated/graphql";
import useStore from "../../../../../../store/useStore";
import { joinClass } from "../../../../../../utils/joinClass";
import RegCardPDF from "./RegCardPDF";

export interface RegCardModalProps {
  status?: boolean;
  handleClose?: () => void;
  handleProceed?: () => void;
}

const RegCardModal: React.FC<RegCardModalProps> = ({ handleClose, status }) => {
  const {
    student: { selectedRecord },
    globalVars: { year_level },
  } = useStore();

  const { data, loading } = useQuery(GetEnrollmentRecordDocument, {
    variables: {
      eid: selectedRecord.id as string,
    },
  });

  const typedData = data?.getEnrollmentRecord as unknown as EnrolledRecord;

  // const studetDataArr = enrolledStudentList.filter(
  //   ({ id }) => id === selectedRecord.id
  // );

  // const selectedStudent = studetDataArr[0];

  const timeStamp = format(new Date(), "ddMMhhmmss");

  const downloadButtonDisabled = loading;

  return (
    <>
      <Modal
        title="Registration Card"
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
              Close
            </button>
            {!loading && (
              <PDFDownloadLink
                document={
                  <RegCardPDF data={typedData} year_level={year_level} />
                }
                fileName={`${typedData.student?.first_name} ${typedData.student?.last_name}-${timeStamp}.pdf`}
                className={joinClass(
                  "flex gap-2 btn btn-sm btn-info ",
                  downloadButtonDisabled ? "btn-disabled" : ""
                )}
                onClick={() => {
                  // if (handleClose) handleClose();
                }}
              >
                <FiDownload />
                <span>Download</span>
              </PDFDownloadLink>
            )}
          </div>
        }
      >
        <div className="text-left">
          {downloadButtonDisabled && <h2>Something went wrong</h2>}
        </div>
      </Modal>
    </>
  );
};
export default RegCardModal;
