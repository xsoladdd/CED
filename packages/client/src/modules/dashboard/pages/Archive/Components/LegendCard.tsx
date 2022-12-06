import React from "react";
import Card, { CardHeader } from "../../../../../components/Card";
import Status from "../../../../../components/Status";

const LegendCard: React.FC = ({}) => {
  return (
    <>
      <Card
        className="w-full xl:w-2/12"
        bordered={false}
        header={<CardHeader title="Legend" />}
      >
        <ul className="flex flex-col gap-[3px]">
          <li className="text-xs flex gap-2">
            <Status color="red" />
            <span>Not Paid</span>
          </li>

          <li className="text-xs flex gap-2">
            <Status color="yellow" />
            <span>Installment</span>
          </li>
          <li className="text-xs flex gap-2">
            <Status color="green" />
            <span>Fully Paid</span>
          </li>

          <li className="text-xs flex gap-2">
            <Status color="grey" />
            <span>Dropped</span>
          </li>
        </ul>
      </Card>
    </>
  );
};
export default LegendCard;
