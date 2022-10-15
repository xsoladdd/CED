import React from "react";
import Button from "../../../../ui/Button";
import Card from "../../../../ui/Card";

const Dashboard: React.FC = ({}) => {
  return (
    <>
      <Card className="w-full divide-y-[1px] py-6">
        <div className="px-6 pb-2">
          <span className="font-semibold">HELLO WORLD</span> -{" "}
          <span className="text-xs text-gray-500">Please fill up the form</span>
        </div>
        <div className=" px-6 py-4">
          <div className="overflow-x-auto">
            <table className="table w-full table-compact">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Job</th>
                  <th>Favorite Color</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>1</th>
                  <td>Cy Ganderton</td>
                  <td>Quality Control Specialist</td>
                  <td>Blue</td>
                </tr>
                <tr>
                  <th>2</th>
                  <td>Hart Hagerty</td>
                  <td>Desktop Support Technician</td>
                  <td>Purple</td>
                </tr>
                <tr>
                  <th>3</th>
                  <td>Brice Swyre</td>
                  <td>Tax Accountant</td>
                  <td>Red</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className=" px-6 pt-4 flex justify-between">
          <div className=""> </div>
          <div className="">
            <Button size="md">Hello World</Button>
          </div>
        </div>
      </Card>
    </>
  );
};
export default Dashboard;
