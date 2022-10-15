import React from "react";
import useDashboardRouter from "../../../../../../hooks/useDashboardRouter";
import Button from "../../../../../../ui/Button";
import Card, { CardFooter, CardHeader } from "../../../../../../ui/Card";
import FilterSearchInput from "./FilterSearchInput";

const FilterCard: React.FC = ({}) => {
  const { pushRoute } = useDashboardRouter();
  const footer = (
    <CardFooter
      right={
        <div className="flex gap-2">
          <Button color="ghost" size="sm">
            Reset
          </Button>
          <Button color="primary" size="sm">
            Filter
          </Button>
        </div>
      }
      left={
        <div className="flex gap-2">
          <Button
            color="accent"
            size="sm"
            onClick={() =>
              pushRoute({ title: "Create new account", route: "accounts:new" })
            }
          >
            Add new account
          </Button>
        </div>
      }
    />
  );

  const header = <CardHeader title="Manage List" subTitle="" />;

  return (
    <>
      <Card
        className="w-full"
        header={header}
        footer={footer}
        toggle
        // toggleStatus={false}
      >
        <div className="px-6 grid gap-2  md:grid-cols-2  lg:grid-cols-3">
          <FilterSearchInput />
          {/* <div className="bg-green-300">green</div>
          <div className="bg-yellow-300">yellow</div> */}
        </div>
      </Card>
    </>
  );
};
export default FilterCard;
