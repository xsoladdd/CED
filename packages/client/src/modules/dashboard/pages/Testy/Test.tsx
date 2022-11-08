import React from "react";
import Card, { CardFooter, CardHeader } from "../../../../components/Card";

const Test: React.FC = ({}) => {
  return (
    <>
      <Card
        className="w-full xl:w-10/12"
        header={<CardHeader title="Filter" />}
        footer={
          <CardFooter
            left={
              <div className="flex gap-2">
                <button className="btn btn-sm btn-primary">
                  Enroll student
                </button>
                <button className="btn btn-sm btn-error" disabled={true}>
                  Drop Students
                </button>
              </div>
            }
            right={
              <div className="flex gap-2">
                <button className="btn btn-sm btn-link" type={"button"}>
                  Reset
                </button>
                <button className="btn btn-sm btn-success" type={"button"}>
                  Filter
                </button>
              </div>
            }
          />
        }
      >
        {/* <div className="flex gap-2">
        <div className="">
          <label className="input-group input-group-sm">
            <span className="search-identifier">
              <FiSearch />
            </span>
            <input
              type="search"
              placeholder="Search for ID, Name and Email"
              className="input input-bordered input-sm min-w-[250px]"
            />
          </label>
        </div>
        <div className=" w-fit">
          <div className="form-control max-w-xs bg">
            <select
              className="select select-bordered min-w-[250px] select-sm"
              onChange={(e) => {
                setSelectedYear(e.target.value);
                setSelectedSection("");
              }}
              value={selectedYear}
            >
              <option value="">Select Year</option>
              {year_level.map(({ title, value }, idx) => (
                <option key={idx} value={value}>
                  {title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className=" w-fit">
          <div className="form-control max-w-xs bg">
            <select
              className="select select-bordered min-w-[250px] select-sm"
              disabled={!selectedYear}
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
            >
              <option value="">Select Section</option>
              {sectionArray.length !== 0 &&
                sectionArray[0].sections?.map(({ title, value }, idx) => (
                  <option key={idx} value={value}>
                    {title}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div> */}
      </Card>
    </>
  );
};
export default Test;
