import React from "react";
import { Calendar } from "react-date-range";
import useToggle from "../../hooks/useToggle";
import { formatDate } from "../../utils/formatDate";
import { joinClass } from "../../utils/joinClass";

interface IDatepickerProps {
  required?: boolean;
  placeholder?: string;
  value: string;
  onChange: (date: string | null) => void;
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
          value={formatDate(new Date(value))}
          placeholder={placeholder}
          onClick={() => toggle()}
        />
        {/* <div className=""> */}
        {status && (
          <Calendar
            date={typeof value !== "string" ? value : undefined}
            onChange={(date) => {
              onChange(formatDate(date));
              toggle();
            }}
            className="border-[1px] absolute top-[30px] left-0  z-20"
          />
        )}
        {/* </div> */}
      </div>
    </>
  );
};
export default Datepicker;
