import { useRouter } from "next/router";
import React from "react";
import { client } from "../../../../graphQL/helper";
import useStore from "../../../../store/useStore";

const SignoutArea: React.FC = () => {
  const { push } = useRouter();
  const {
    globalVars: { school_year },
  } = useStore();
  return (
    <>
      <div className="flex place-items-center gap-5">
        <span className="text-sm ">SY: {school_year}</span>
        <button
          className="link text-sm"
          onClick={() => {
            client.clearStore();
            localStorage.clear();
            push("/");
          }}
        >
          SIGN OUT
        </button>
      </div>
    </>
  );
};
export default SignoutArea;
