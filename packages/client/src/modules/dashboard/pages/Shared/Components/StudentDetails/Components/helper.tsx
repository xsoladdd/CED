import Datepicker from "../../../../../../../components/Datepicker";
import RequiredIndicator from "../../../../../../../components/Required/RequiredIndicator";
import Text from "../../../../../../../components/Text";
import { joinClass } from "../../../../../../../utils/joinClass";
import { IgenerateInput } from "../type";

export const generateInput = ({
  disabled = false,
  id,
  label = "",
  onChange = () => {},
  onDateChange = () => {},
  value,
  placeholder,
  required,
  type,
  inputType = "input",
  error = "",
  touched = false,
  selectValues = [],
  className,
  isHorizontal = false,
}: IgenerateInput) => (
  <div
    className={joinClass(
      `form-control max-w-lg`,
      isHorizontal ? "flex flex-row gap-3" : "",
      className
    )}
  >
    <label className="label">
      <span className="label-text block whitespace-nowrap">
        {!disabled && required ? <RequiredIndicator /> : " "}
        {` ${label}`}
      </span>
    </label>
    <div className="w-10/12">
      {inputType === "input" && (
        <input
          type={type}
          placeholder={placeholder}
          className={joinClass(
            `input input-bordered  input-sm w-full`,
            error && touched ? `input-error` : ""
          )}
          value={value && value.toString()}
          onChange={onChange}
          id={id}
          name={id}
          disabled={disabled}
        />
      )}
      {inputType === "select" && (
        <select
          className={joinClass(
            `select select-bordered select-sm w-full`,
            error && touched ? `select-error` : ""
          )}
          value={value && value.toString()}
          onChange={onChange}
          id={id}
          name={id}
          disabled={disabled}
        >
          <option value="" disabled>
            {placeholder ? placeholder : "Pick one"}
          </option>
          {selectValues.map(({ text, value: optValue, id: optionId }, idx) => (
            <option value={optValue} key={idx} id={optionId}>
              {text}
            </option>
          ))}
        </select>
      )}
      {inputType === "date" && (
        <Datepicker
          placeholder={placeholder}
          className={joinClass(
            `input input-bordered  input-sm w-full`,
            error && touched ? `input-error` : ""
          )}
          value={typeof value !== "string" ? value : new Date(value)}
          onChange={(date) => onDateChange(date)}
          id={id}
          disabled={disabled}
        />
      )}
      {error && touched && (
        <Text variant="error" className="pt-2">
          {error}
        </Text>
      )}
    </div>
  </div>
);
