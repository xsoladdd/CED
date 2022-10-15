import React from "react";
import { FiSearch } from "react-icons/fi";
import { Input } from "../../../../../../ui/Forms";

const FilterSearchInput: React.FC<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
> = ({ value, onChange }) => {
  return (
    <>
      <div className="max-w-xs relative">
        <div className="absolute h-full px-[10px]  flex place-items-center">
          <FiSearch size="18" className="text-gray-400" />
        </div>
        <Input
          size="sm"
          className="pl-[35px]"
          placeholder="Search"
          value={value}
          onChange={onChange}
        />
      </div>
    </>
  );
};
export default FilterSearchInput;
