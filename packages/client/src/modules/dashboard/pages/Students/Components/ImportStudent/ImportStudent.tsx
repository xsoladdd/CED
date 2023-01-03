import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { FiDownload, FiLoader } from "react-icons/fi";
import { read, utils } from "xlsx";
import Card, {
  CardFooter,
  CardHeader,
} from "../../../../../../components/Card";
import {
  AddStudentsDocument,
  StudentFragment,
  ValidateStudentIDsDocument,
} from "../../../../../../graphQL/generated/graphql";
import { exportExcel } from "../../../../../../utils/exportToExcel";
import { joinClass } from "../../../../../../utils/joinClass";
import { useLazyQuery, useMutation } from "@apollo/client";
import useDashboardRouter from "../../../../../../hooks/useDashboardRouter";
import _ from "lodash";

const ImportStudent: React.FC = () => {
  const fileTypes = ["xlsx", "xlsm"];
  const [error, setError] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [excelData, setExcelData] = useState<Array<StudentFragment>>([]);
  const [status, setStatus] =
    useState<"success" | "error" | "normal">("normal");

  const { pushRoute } = useDashboardRouter();

  const [validateStudentIDs, { loading }] = useLazyQuery(
    ValidateStudentIDsDocument
  );

  const [addStudents, { loading: addStudentsLoading }] = useMutation(
    AddStudentsDocument,
    {
      fetchPolicy: "no-cache",
    }
  );

  const handleChange = (efile: File) => {
    setFile(null);
    setFile(efile);
    if (efile) {
      // const name = file.name;
      const reader = new FileReader();
      reader.onload = (evt) => {
        // evt = on_file_select event
        /* Parse data */
        const bstr = evt?.target?.result;
        const wb = read(bstr, { type: "binary" });
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = utils.sheet_to_json<StudentFragment>(ws);
        /* Update state */

        console.log(data);

        if (data.length >= 150) {
          setError("Row count must be lessthan or equals 150");
          setStatus("error");
        } else {
          const lrnArr = data.map(({ LRN }) => LRN.toString());
          validateStudentIDs({
            variables: {
              lrNs: lrnArr,
            },
            onCompleted: (value) => {
              console.log("completed");
              if (value.validateStudentIDs) {
                if (!value.validateStudentIDs.isValid) {
                  setStatus("error");
                  setError(
                    `${
                      value.validateStudentIDs.message
                    }, LRNS: ${value.validateStudentIDs.LRNs?.join(", ")}`
                  );
                } else {
                  setExcelData(data);
                  setStatus("success");
                }
              }
            },
            onError: () => {
              console.log("error");
            },
          });
        }
      };
      reader.readAsBinaryString(efile);
    }
  };

  const handleSubmit = () => {
    const chunkedData = _.chunk(excelData, 100);
    chunkedData.map((arr, idx) => {
      console.log("arr batch", idx);
      addStudents({
        onError: (err) => {
          console.log(err.message);
          setError(err.message);
          setStatus("error");
        },
        variables: {
          input: [
            ...arr.map(
              ({
                LRN,
                first_name,
                middle_name,
                last_name,
                gender,
                birthday,
                contact_number,
                email,
              }) => ({
                LRN: LRN.toString(),
                first_name,
                middle_name,
                last_name,
                gender,
                birthday,
                contact_number,
                email,
              })
            ),
          ],
        },
        onCompleted: () => {
          setFile(null);
          setStatus("normal");
          setError("");
          pushRoute({
            title: "students",
            route: "students",
          });
        },
      });
    });
  };

  const handleDownloadTemplate = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    exportExcel(
      [
        {
          LRN: "",
          first_name: "",
          middle_name: "",
          last_name: "",
          email: "",
          contact_number: "",
          birthday: "",
          gender: "m",
        },
      ],
      `student-import-template.xlsm`
    );
  };

  const cardFooter = (
    <CardFooter
      right={
        <div className="flex gap-5">
          {" "}
          <button
            className={`btn btn-sm btn-link`}
            // type="submit"
            type="button"
            onClick={() => {
              setFile(null);
              setError("");
              setStatus("normal");
            }}
          >
            Reset
          </button>
          <button
            className={`btn btn-sm btn-success`}
            // type="submit"
            type="button"
            onClick={() => handleSubmit()}
            disabled={status !== "success" || addStudentsLoading}
          >
            Submit
          </button>
        </div>
      }
    />
  );

  const cardHeader = (
    <div className="w-full flex justify-between ">
      <CardHeader
        title="IMPORT STUDENTS"
        subTitle="Drag or select a file to proceed"
      />
      <div className="flex gap-2">
        <button
          className="btn btn-sm btn-success flex gap-2"
          type="button"
          onClick={handleDownloadTemplate}
        >
          <FiDownload /> Template
        </button>
      </div>
    </div>
  );
  return (
    <>
      <Card
        className="w-full overflow-visible"
        header={cardHeader}
        footer={cardFooter}
      >
        <div className="flex flex-col gap-5">
          <div className="max-w-2xl mx-auto w-full">
            <FileUploader
              handleChange={handleChange}
              name="file"
              types={fileTypes}
              onTypeError={() => {
                setStatus("error");
                setError(
                  `Invalid Type, you can only upload ${fileTypes.join(", ")}`
                );
              }}
              onSelect={() => {
                setError("");
                setStatus("success");
              }}
              onSizeError={() => {
                setStatus("error");
                setError("Invalid size");
              }}
              className=""
            >
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className={joinClass(
                    `flex flex-col items-center justify-center w-full h-64 border-2  border-dashed rounded-lg cursor-pointer  dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600  dark:hover:bg-gray-600`,
                    status === "error" ? "border-red-500 bg-red-50" : "",
                    status === "success" ? "border-green-500 bg-gray-50" : "",
                    status === "normal" ? "border-gray-300 bg-gray-50" : ""
                  )}
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-10 h-10 mb-3 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {fileTypes.join(" ").toUpperCase()}
                    </p>
                  </div>
                  {loading && <FiLoader className="animate-spin" />}
                  {status === "error" && (
                    <p className="text-red-500 text-xs flex place-items-center">
                      {error}
                    </p>
                  )}
                  {status === "success" && (
                    <p className="text-green-600 text-xs flex place-items-center">
                      {file?.name}
                    </p>
                  )}
                </label>
              </div>
            </FileUploader>
          </div>
        </div>
      </Card>
    </>
  );
};
export default ImportStudent;
