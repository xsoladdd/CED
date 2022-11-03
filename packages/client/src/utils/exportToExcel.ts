import * as FileSaver from "file-saver";
import { utils, write } from "sheetjs-style";

export const exportExcel = (excelData: any, filename = "dummy") => {
  const fileType =
    "application/vnd.opoenxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const ws = utils.json_to_sheet(excelData);
  const wb = {
    Sheets: {
      data: ws,
    },
    SheetNames: ["data"],
  };
  const excelBuffer = write(wb, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(data, filename + fileExtension);
};
