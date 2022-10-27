import { PDFDownloadLink } from "@react-pdf/renderer";
import React from "react";
import { FiDownload } from "react-icons/fi";
import Card, { CardHeader } from "../../../../../../components/Card";
import { docs } from "./helper";

const RegCard: React.FC = ({}) => {
  const header = (
    <div className="w-full flex justify-between ">
      <CardHeader title={`Registration Card`} subTitle={`Student :DUmmy LRN`} />

      <div className="flex gap-2">
        <PDFDownloadLink document={docs} fileName="save.pdf">
          <button className="btn btn-xs btn-info flex gap-2" type="submit">
            <FiDownload />
            <span>Download</span>
          </button>
        </PDFDownloadLink>
      </div>
    </div>
  );
  return (
    <>
      <Card className="w-full" header={header}>
        <div className="w-[720px]">{docs}</div>
      </Card>
    </>
  );
};
export default RegCard;
