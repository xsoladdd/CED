import React, { useState } from "react";
import Card from "../../../../../ui/Card/Card";
import {
  Header1,
  Header2,
  Header3,
  Header4,
} from "../../../../../components/UiBuilder/Header";
import {
  IHeader,
  INavLink,
} from "../../../../../components/UiBuilder/Header/types";
import { Label, Select } from "../../../../../ui/Forms";
import { ISelectDataArray } from "../../../../../ui/Forms/Select/types";

interface ISiteBuilderProps {}

const SiteBuilder: React.FC<ISiteBuilderProps> = ({}) => {
  const [selectedHeader, setSelectedHeader] = useState("header1");

  const navs: Array<INavLink> = [
    { name: "Home", path: "/" },
    { name: "About", path: "/" },
    { name: "Contact", path: "/" },
    { name: "FAQ", path: "/" },
  ];

  const headers: Array<{
    title: string;
    value: string;
    comp: React.FC<IHeader>;
  }> = [
    {
      title: `Header 1`,
      value: "header1",
      comp: Header1,
    },
    {
      title: `Header 2`,
      value: "header2",
      comp: Header2,
    },
    {
      title: `Header 3`,
      value: "header3",
      comp: Header3,
    },
    {
      title: `Header 4`,
      value: "header4",
      comp: Header4,
    },
  ];

  const selectData: ISelectDataArray = navs.map(({ name }) => ({
    text: name,
    value: name,
  }));

  const panel = (
    <div className="w-full border-[1px] rounder-md py-2 border-theme-primary-light-gray">
      <h3 className="text-center w-full text-lg ">Site Builder</h3>
      <div className="pt-2 px-4">
        <div className="w-1/3 flex gap-2 place-items-center">
          <Label text="Page: " id="pageSelection" />
          <Select data={selectData} id="pageSelection" />
        </div>
      </div>
    </div>
  );

  const builder = (
    <div className="flex gap-3 w-full h-full">
      <div className="w-[300px] bg-red-300 h-full">
        <Label text="Header: " id="pageSelection" />
        <Select
          data={headers.map(({ title, value }) => ({
            text: title,
            value,
          }))}
          onChange={(e) => setSelectedHeader(e.target.value)}
          id="pageSelection"
        />
      </div>
      <div className=" w-full">
        <div className="flex flex-col border-[1px] border-theme-primary-light-gray  bg-gray-400">
          {headers
            .filter(({ value }) => value === selectedHeader)
            .map(({ comp: HeaderSelected }, idx) => (
              <HeaderSelected title={`Tailblock`} links={navs} key={idx} />
            ))}
          {/* <p>aw</p> */}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Card className="min-h-full">
        <div className="flex flex-col gap-5 h-full">
          {panel}
          {builder}
        </div>
      </Card>
    </>
  );
};
export default SiteBuilder;
