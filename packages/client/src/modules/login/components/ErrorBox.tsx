import React from "react";
import Text from "../../../ui/Text";
interface IErrorBoxProps {
  error?: string;
}

const ErrorBox: React.FC<IErrorBoxProps> = ({ error }) => {
  if (error) {
    return (
      <div className=" bg-red-100 border-[1px] border-red-400 rounded">
        <Text variant="error" className="py-3 px-5">
          {error}
        </Text>
      </div>
    );
  }
  return null;
};
export default ErrorBox;
