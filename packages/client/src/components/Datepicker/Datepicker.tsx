import React from "react";
import { Calendar } from "react-date-range";
import useToggle from "../../hooks/useToggle";
import { formatDateReadable } from "../../utils/formatDateReadable";
import { joinClass } from "../../utils/joinClass";

interface IDatepickerProps {
  required?: boolean;
  placeholder?: string;
  value?: Date;
  onChange: (date: Date) => void;
  error?: string | boolean;
  touched?: boolean;
  id: string;
  disabled?: boolean;
  className?: string;
}

const Datepicker: React.FC<IDatepickerProps> = ({
  onChange,
  value,
  placeholder,
  disabled,
  className,
  error,
  touched,
}) => {
  const { status, toggle } = useToggle(false);
  return (
    <>
      <div className="relative">
        <input
          id="id"
          name="id"
          className={joinClass(
            `input input-bordered  input-sm w-full `,
            error && touched ? `input-error` : "",
            className
          )}
          readOnly
          value={formatDateReadable(value)}
          placeholder={placeholder}
          onClick={() => toggle()}
          disabled={disabled}
        />
        {status && (
          <Calendar
            date={typeof value !== "string" ? value : undefined}
            onChange={(date) => {
              onChange(date);
              toggle();
            }}
            className="border-[1px] absolute top-[30px] left-0  z-20"
          />
        )}
      </div>
    </>
  );
};
export default Datepicker;
