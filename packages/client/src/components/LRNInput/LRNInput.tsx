import { useLazyQuery } from "@apollo/client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { AiFillWarning } from "react-icons/ai";
import { FiCheck, FiLoader } from "react-icons/fi";
import { CheckUniqueLrnDocument } from "../../graphQL/generated/graphql";
import useDebounce from "../../hooks/useDebounce";
import { joinClass } from "../../utils/joinClass";
import RequiredIndicator from "../Required/RequiredIndicator";
import Text from "../Text";
import Tooltip from "../Tooltip";

interface ILRNInputProps {
  LRN: string;
  formikHandleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  id: string;
  setFieldError: (field: string, message: string) => void;
  currentLRN?: string;
  disabled?: boolean;
}

const LRNInput: React.FC<ILRNInputProps> = ({
  LRN,
  error,
  formikHandleChange,
  id,
  setFieldError,
  disabled,
  currentLRN,
}) => {
  const [fetchLoading, setFetchLoading] = useState(false);
  const [checkLRN, { data }] = useLazyQuery(CheckUniqueLrnDocument, {});
  const debouncedLRN: string = useDebounce<string>(LRN, 500);
  // Effect for API call
  useEffect(
    () => {
      if (debouncedLRN && LRN.length >= 5) {
        setFetchLoading(true);
        checkLRN({
          variables: {
            lrn: LRN,
            currentLrn: currentLRN ? currentLRN : undefined,
          },
          onCompleted: (value) => {
            setFetchLoading(false);
            if (!value.checkUniqueLRN) {
              setFieldError(id, "LRN Already exist");
            } else {
              setFieldError(id, "");
            }
            // formik.setFieldTouched("basicInfo.LRN", true);
          },
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [debouncedLRN] // Only call effect if debounced search term changes
  );
  return (
    <div className={joinClass(`form-control w-1/2`)}>
      <label className="label">
        <span className="label-text ">
          <RequiredIndicator /> LRN :
        </span>
      </label>
      <div className="flex gap-2 place-items-center">
        <input
          placeholder={"##############"}
          disabled={disabled}
          className={joinClass(
            `input input-bordered  input-sm w-full`,
            error ? `input-error` : "",
            data?.checkUniqueLRN ? "input-success" : "",
            data?.checkUniqueLRN === false ? "input-error" : ""
          )}
          value={LRN}
          onChange={formikHandleChange}
          // onChange={handleLRNValidation}
          id={id}
          name={id}
        />
        {data?.checkUniqueLRN === false && (
          <Tooltip text="LRN is already registered to a student">
            <AiFillWarning className="text-red-500" />
          </Tooltip>
        )}
        {data?.checkUniqueLRN && <FiCheck className="text-green-500" />}
        {fetchLoading && <FiLoader className="animate-spin" />}
      </div>
      <Text variant="error" className="pt-2">
        {error}
      </Text>
    </div>
  );
};
export default LRNInput;
