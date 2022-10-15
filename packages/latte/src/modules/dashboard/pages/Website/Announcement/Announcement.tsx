import React from "react";
import Card from "../../../../../ui/Card/Card";

interface IAnnouncementProps {}

const Announcement: React.FC<IAnnouncementProps> = ({}) => {
  return (
    <>
      <Card className="p-4 w-fit">
        <div className="flex gap-5">
          <div className="flex gap-3 flex-col">
            <p className="w-full text-center"> Primary </p>
            <button className="btn btn-primary">Button</button>
            <button className="btn btn-outline btn-primary">Button</button>
            <button className="btn btn-primary" disabled>
              Button
            </button>
          </div>

          <div className="flex gap-3 flex-col">
            <p className="w-full text-center"> Secondary </p>
            <button className="btn btn-secondary">Button</button>
            <button className="btn btn-outline btn-secondary">Button</button>
            <button className="btn btn-secondary" disabled>
              Button
            </button>
          </div>

          <div className="flex gap-3 flex-col">
            <p className="w-full text-center"> Accent </p>
            <button className="btn btn-accent">Button</button>
            <button className="btn btn-outline btn-accent">Button</button>
            <button className="btn btn-accent" disabled>
              Button
            </button>
          </div>

          <div className="flex gap-3 flex-col">
            <p className="w-full text-center"> Info </p>
            <button className="btn btn-info">Button</button>
            <button className="btn btn-outline btn-info">Button</button>
            <button className="btn btn-info" disabled>
              Button
            </button>
          </div>

          <div className="flex gap-3 flex-col">
            <p className="w-full text-center"> Success </p>
            <button className="btn btn-success">Button</button>
            <button className="btn btn-outline btn-success">Button</button>
            <button className="btn btn-success" disabled>
              Button
            </button>
          </div>
          <div className="flex gap-3 flex-col">
            <p className="w-full text-center"> Warning </p>
            <button className="btn btn-warning">Button</button>
            <button className="btn btn-outline btn-warning">Button</button>
            <button className="btn btn-warning" disabled>
              Button
            </button>
          </div>

          <div className="flex gap-3 flex-col">
            <p className="w-full text-center"> Error </p>
            <button className="btn btn-error">Button</button>
            <button className="btn btn-outline btn-error">Button</button>
            <button className="btn btn-error" disabled>
              Button
            </button>
          </div>

          {/* <button className="btn btn-secondary">Secondary 2</button> */}
        </div>
      </Card>
    </>
  );
};
export default Announcement;
