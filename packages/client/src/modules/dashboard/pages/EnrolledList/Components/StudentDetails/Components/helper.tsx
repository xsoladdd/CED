import RequiredIndicator from "../../../../../../../components/Required/RequiredIndicator";
import Text from "../../../../../../../components/Text";
import { joinClass } from "../../../../../../../utils/joinClass";
import { IgenerateInput } from "../type";

export const generateInput = ({
  disabled,
  id,
  label,
  onChange,
  value,
  placeholer,
  required,
  type,
  inputType = "input",
  error,
  touched,
  selectValues = [],
  className,
}: IgenerateInput) => (
  <div className={joinClass(`form-control max-w-sm`, className)}>
    <label className="label">
      <span className="label-text ">
        {!disabled && required ? <RequiredIndicator /> : " "}
        {` ${label}`}
      </span>
    </label>
    {inputType === "input" && (
      <input
        type={type}
        placeholder={placeholer}
        className={joinClass(
          `input input-bordered  input-sm w-full`,
          error && touched ? `input-error` : ""
        )}
        value={value}
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
        value={value}
        onChange={onChange}
        id={id}
        name={id}
        disabled={disabled}
      >
        <option value="" disabled>
          {placeholer ? placeholer : "Pick one"}
        </option>
        {selectValues.map(({ text, value: optValue, id: optionId }, idx) => (
          <option value={optValue} key={idx} id={optionId}>
            {text}
          </option>
        ))}
      </select>
    )}
    {error && touched && (
      <Text variant="error" className="pt-2">
        {error}
      </Text>
    )}
  </div>
);
