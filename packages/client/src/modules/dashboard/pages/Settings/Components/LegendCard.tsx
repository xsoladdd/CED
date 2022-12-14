import React from "react";
import Card, { CardHeader } from "../../../../../components/Card";
import Status from "../../../../../components/Status";

const LegendCard: React.FC = ({}) => {
  return (
    <Card className="" bordered={false} header={<CardHeader title="Legend" />}>
      <ul className="flex flex-col gap-[3px]">
        <li className="text-xs flex gap-2">
          <Status color="green" />
          <span>Enrolled</span>
        </li>

        <li className="text-xs flex gap-2">
          <Status color="grey" />
          <span>Not-Enrolled</span>
        </li>

        <li className="text-xs flex gap-2">
          <Status color="blue" />
          <span>Old Student</span>
        </li>
      </ul>
    </Card>
  );
};
export default LegendCard;
