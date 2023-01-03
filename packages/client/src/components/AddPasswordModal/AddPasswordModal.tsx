import React, { useRef, useState } from "react";
import useStore from "../../store/useStore";
import { joinClass } from "../../utils/joinClass";
import Modal from "../Modal";
import RequiredIndicator from "../Required/RequiredIndicator";
import Text from "../Text";
import { AddPasswordModalProps } from "./types";
import { useMutation } from "@apollo/client";
import { ChangeEmployeePasswordDocument } from "../../graphQL/generated/graphql";

const AddPasswordModal: React.FC<AddPasswordModalProps> = ({}) => {
  const [error, setError] = useState("");
  const [changeEmployeePassword] = useMutation(ChangeEmployeePasswordDocument);
  const {
    user: {
      data: { partial_password, employee_id },
      nullifyPartialPassword,
    },
  } = useStore();

  const pwRef = useRef<HTMLInputElement>(null);
  const repeatPwRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = () => {
    console.log("ayokong maulit ang dating nangyare");
    if (pwRef.current?.value !== repeatPwRef.current?.value) {
      return setError("Password does not match");
    }
    changeEmployeePassword({
      variables: {
        password: pwRef.current?.value as string,
        employeeId: employee_id,
      },
      onError: (err) => {
        setError(err.message);
      },
      onCompleted: () => {
        return nullifyPartialPassword();
      },
    });
  };

  return (
    <>
      <Modal
        title="Welcome."
        status={!!partial_password}
        size="lg"
        footer={
          <div className="flex justify-between">
            {error && (
              <Text variant="error" className="flex place-items-center">
                {error}
              </Text>
            )}
            <div className=" flex gap-2 justify-end">
              <button
                className="btn btn-link btn-sm"
                onClick={() => formRef.current?.reset()}
              >
                Reset
              </button>
              <button
                className={joinClass(`btn btn-sm`)}
                onClick={() => {
                  handleSubmit();
                }}
              >
                Proceed
              </button>
            </div>
          </div>
        }
      >
        <div className="text-left">
          <p className="text-sm">{`You're required to add a new password.`}</p>
          <form ref={formRef}>
            <div className="flex flex-col pt-2 gap-2">
              <div className={"form-control max-w-lg flex flex-row gap-3"}>
                <label className="label">
                  <span className="label-text block whitespace-nowrap">
                    <RequiredIndicator /> Password :
                  </span>
                </label>
                <input
                  className="input input-bordered  input-sm w-full"
                  placeholder="***"
                  ref={pwRef}
                />
              </div>

              <div className={"form-control max-w-lg flex flex-row gap-3"}>
                <label className="label">
                  <span className="label-text block whitespace-nowrap">
                    <RequiredIndicator /> Repeat Password :
                  </span>
                </label>
                <input
                  className="input input-bordered  input-sm w-full"
                  placeholder="***"
                  ref={repeatPwRef}
                />
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};
export default AddPasswordModal;
