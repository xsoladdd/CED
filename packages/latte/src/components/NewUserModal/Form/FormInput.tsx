import React from "react";
import { Input, Label, TextArea } from "../../../ui/Forms";
import Text from "../../../ui/Text";
import { IgenerateField } from "../types";

interface IFormInputProps extends IgenerateField {
  handleChange: (e: React.ChangeEvent<any>) => void;
  handleBlur: (e: React.ChangeEvent<any>) => void;
}

const FormInput: React.FC<IFormInputProps> = ({
  error,
  id,
  touched,
  type,
  value,
  label,
  required,
  placeholder,
  // handleBlur,
  handleChange,
}) => {
  return (
    <>
      <div className="flex flex-col gap-1">
        <Label text={label} id={id} required={required} />
        {(typeof type === "undefined" || type === "input") && (
          <>
            <Input
              isBordered
              autoComplete={"off"}
              id={id}
              // onBlur={handleBlur}
              onChange={handleChange}
              value={value}
              placeholder={placeholder}
            />
            {touched && error ? <Text variant="error">{error}</Text> : null}
          </>
        )}
        {type === "textarea" && (
          <>
            <TextArea
              isBordered
              id={id}
              autoComplete={"off"}
              // onBlur={handleBlur}
              onChange={handleChange}
              value={value}
              placeholder={placeholder}
              className={`h-[80px]`}
            />
            {touched && error ? <Text variant="error">{error}</Text> : null}
          </>
        )}
      </div>
    </>
  );
};
export default FormInput;
